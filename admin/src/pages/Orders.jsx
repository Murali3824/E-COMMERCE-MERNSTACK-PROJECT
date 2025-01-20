import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [token]);

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(`${backendUrl}/api/order/status`, {
                orderId,
                status: event.target.value,
            }, { headers: { token } });

            if (response.data.success) {
                await fetchAllOrders();
                toast.success('Order status updated');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="sm:p-6">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 shadow-sm rounded-lg p-5"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    className="w-12 h-12"
                                    src={assets.order_icon2}
                                    alt="Order Parcel Icon"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Order #{order._id.slice(-6)}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Items:</h3>
                                <ul className="list-disc list-inside">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">
                                            {item.name} x {item.quantity} ({item.size})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Shipping Address:</h3>
                                <p className="text-sm text-gray-700">
                                    {order.address.firstName} {order.address.lastName}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                                </p>
                                <p className="text-sm text-gray-700">Phone: {order.address.phone}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Payment: <span className="font-medium">{order.payment ? 'Done' : 'Pending'}</span>
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Total: <span className="font-medium">{currency}{order.amount}</span>
                                    </p>
                                </div>
                                <div>
                                    <select
                                        onChange={(e) => statusHandler(e, order._id)}
                                        value={order.status}
                                        className="p-2 text-sm border rounded"
                                    >
                                        <option value="Order Placed">Order Placed</option>
                                        <option value="Order Shipped">Order Shipped</option>
                                        <option value="Out for delivery">Out for delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No orders available</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
