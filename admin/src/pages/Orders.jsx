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
            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
            // console.log(response.data.orders);
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    useEffect(() => {
        fetchAllOrders(); 
    }, [token]);

    const statusHandler = async (event,orderId) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value}, { headers: { token } });
            if (response.data.success) {
                await fetchAllOrders()
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div>
            <h1 className='font-semibold text-xl'>Orders Page</h1>
            <div>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div className='grid grid-flow-col-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-2.5 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-black' key={index}>
                            <img className='w-12' src={assets.order_icon2} alt="Order Parcel Icon" />
                            <div>
                                <div>
                                    {order.items.map((item, index) => (
                                        <p className='truncate py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                                    ))}
                                </div>
                                <p className='mt-1.5 mb-0.5 font-normal'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <p>Address : {order.address.street + ","}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>
                            <div className='text-sm sm:text-[15px]'>
                                <p>Items : {order.items.length}</p>
                                <p className='mt-1'>Method: {order.paymentMethod}</p>
                                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p className='text-sm sm:text-base font-semibold text-green-600'>{currency}{order.amount}</p>
                            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Order Shipped">Order Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p>No orders available</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
