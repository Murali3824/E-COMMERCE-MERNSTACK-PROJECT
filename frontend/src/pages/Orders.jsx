import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = () => {
    const { currency, backendUrl, token } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrderItem = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrderItem.push(item);
                    });
                });
                setOrderData(allOrderItem.reverse());
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] border-t pt-16'>
            <div className='text-2xl text-center mb-8'>
                <Title text1={'My'} text2={'ORDERS'} />
            </div>
            <div className='mt-5'>
                {
                    orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index} className='py-4 border rounded-lg bg-white shadow-md  mb-4'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4'>
                                    <div className='flex items-start gap-4 text-sm'>
                                        <img className='w-16 sm:w-20 rounded' src={item.image[0]} alt={item.name} />
                                        <div className='flex flex-col'>
                                            <p className='sm:text-base font-medium'>{item.name}</p>
                                            <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                                <p className='text-lg'>{currency}{item.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Size: {item.size}</p>
                                            </div>
                                            <div className='flex items-center gap-4 text-gray-600'>
                                                <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                                                <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:w-1/3 flex justify-between items-center mt-4 md:mt-0'>
                                        <div className='flex items-center gap-2'>
                                        {/* Status Indicator */}
                                        <span
                                            className={`h-2 w-2 rounded-full ${
                                                item.status === 'Delivered' ? 'bg-green-500' :
                                                item.status === 'Order Placed' ? 'bg-blue-500' :
                                                item.status === 'Order Shipped' ? 'bg-yellow-500' :
                                                item.status === 'Out for delivery' ? 'bg-orange-500' :
                                                'bg-gray-500' // Default color for unknown status
                                            }`}
                                        ></span>             
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                        </div>
                                        <button onClick={loadOrderData} className='border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 rounded-sm hover:bg-gray-100 transition'>
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <img className='w-1/6' src={assets.no_product} alt="No Orders" />
                            <p className="text-lg font-medium">No orders.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Orders;
