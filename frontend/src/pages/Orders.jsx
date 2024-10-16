import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

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
                response.data.orders.map((order) => {
                    order.items.map((item) => {
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
        <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] lg:[9vw] border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'My'} text2={'ORDERS'} />
            </div>
            <div className='mt-5'>
                {
                    orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
                                <div className='flex items-start gap-6 text-sm'>
                                    <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                                    <div className=''>
                                        <p className='sm:text-base font-medium'>{item.name}</p>
                                        <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                            <p className='text-lg'>{currency}{item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                                            <p className='mt-'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:w-1/2 flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='text-sm md:text-base'>{item.status}</p>
                                    </div>
                                    <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No Orders</p>
                    )
                }
            </div>
        </div>
    );
};

export default Orders;
