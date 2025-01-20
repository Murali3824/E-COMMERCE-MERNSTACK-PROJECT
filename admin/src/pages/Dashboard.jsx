import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IndianRupee, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';



// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
    {children}
  </div>
);

const Select = ({ value, onChange, options }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="w-full sm:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [timeSpan, setTimeSpan] = useState('all');
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalProducts: 0,
    totalUsers: 0,
    growthRate: 0
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
        calculateMetrics(response.data.orders, products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        const productsList = response.data.products;
        setProducts(productsList);
        calculateMetrics(orders, productsList);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const calculateMetrics = (ordersData, productsData) => {
    const filteredOrders = filterOrdersByTimeSpan(ordersData);
    const totalRev = filteredOrders.reduce((acc, order) => acc + order.amount, 0);
    const avgValue = filteredOrders.length > 0 ? totalRev / filteredOrders.length : 0;
    
    // Calculate growth rate
    const previousPeriodOrders = getPreviousPeriodOrders(ordersData);
    const currentPeriodRevenue = totalRev;
    const previousPeriodRevenue = previousPeriodOrders.reduce((acc, order) => acc + order.amount, 0);
    const growthRate = previousPeriodRevenue !== 0 
      ? ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 
      : 0;

    setMetrics({
      totalRevenue: totalRev,
      totalOrders: filteredOrders.length,
      avgOrderValue: Math.round(avgValue),
      totalProducts: productsData?.length || 0,
      totalUsers: new Set(filteredOrders.map(order => order.userId)).size,
      growthRate: Math.round(growthRate * 10) / 10
    });
  };

  const filterOrdersByTimeSpan = (ordersData) => {
    const now = new Date();
    const filterDate = new Date();
    
    switch(timeSpan) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return ordersData;
    }
    
    return ordersData.filter(order => new Date(order.date) >= filterDate);
  };

  const getPreviousPeriodOrders = (ordersData) => {
    const now = new Date();
    const currentPeriodStart = new Date();
    const previousPeriodStart = new Date();
    
    switch(timeSpan) {
      case 'week':
        currentPeriodStart.setDate(now.getDate() - 7);
        previousPeriodStart.setDate(now.getDate() - 14);
        break;
      case 'month':
        currentPeriodStart.setMonth(now.getMonth() - 1);
        previousPeriodStart.setMonth(now.getMonth() - 2);
        break;
      case 'year':
        currentPeriodStart.setFullYear(now.getFullYear() - 1);
        previousPeriodStart.setFullYear(now.getFullYear() - 2);
        break;
      default:
        return [];
    }
    
    return ordersData.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= previousPeriodStart && orderDate < currentPeriodStart;
    });
  };

  const prepareMonthlyData = () => {
    const monthlyData = {};
    const filteredOrders = filterOrdersByTimeSpan(orders);
    
    filteredOrders.forEach(order => {
      const date = new Date(order.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          revenue: 0,
          orders: 0,
          users: new Set()
        };
      }
      monthlyData[monthYear].revenue += order.amount;
      monthlyData[monthYear].orders += 1;
      monthlyData[monthYear].users.add(order.userId);
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      orders: data.orders,
      users: data.users.size
    }));
  };

  const prepareCategoryData = () => {
    const categoryCount = {};
    products.forEach(product => {
      if (!categoryCount[product.category]) {
        categoryCount[product.category] = 0;
      }
      categoryCount[product.category]++;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value
    }));
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [token]);

  useEffect(() => {
    calculateMetrics(orders, products);
  }, [timeSpan, orders, products]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const monthlyData = prepareMonthlyData();
  const categoryData = prepareCategoryData();

  const timeSpanOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' }
  ];

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 max-w-[100vw] overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Analytics Dashboard</h1>
        <Select 
          value={timeSpan} 
          onChange={setTimeSpan}
          options={timeSpanOptions}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Revenue</span>
            <IndianRupee className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold">{currency}{metrics.totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">
            {metrics.growthRate > 0 ? '+' : ''}{metrics.growthRate}% from previous period
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{metrics.totalOrders}</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Avg Order Value</span>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{currency}{metrics.avgOrderValue}</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Products</span>
            <ShoppingBag className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{metrics.totalProducts}</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total Users</span>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{metrics.totalUsers}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="w-full">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Monthly Overview</h2>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  interval={window.innerWidth < 500 ? 1 : 0}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  width={60}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  width={60}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `${currency}${value}` : value,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue" />
                <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
                <Bar yAxisId="right" dataKey="users" fill="#ffc658" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="w-full">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Products by Category</h2>
          </div>
          <div className="flex flex-col items-center">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) =>
          window.innerWidth < 500
            ? `${(percent * 100).toFixed(0)}%`
            : `${name} (${(percent * 100).toFixed(0)}%)`
        }
        outerRadius={window.innerWidth < 500 ? 60 : 80}
        fill="#8884d8"
        dataKey="value"
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
  {/* Custom Legend Section Below the Chart */}
  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
    {categoryData.map((entry, index) => (
      <div
        key={`legend-item-${index}`}
        className="flex items-center space-x-2"
      >
        <span
          className="w-4 h-4 inline-block"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></span>
        <span className="text-sm">{`${entry.name}: ${entry.value}`}</span>
      </div>
    ))}
  </div>
</div>

        </Card>
      </div>
    </div>
  );
};

export default Dashboard;