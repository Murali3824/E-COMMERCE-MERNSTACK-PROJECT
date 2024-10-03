import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

    const {products,currency} = useContext(ShopContext);

    return (
        <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] lg:[9vw] border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'}/>
            </div>
            <div className='mt-5'>
                {
                    products.slice(2,5).map((item,index) => (
                        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image} alt="" />
                                <div className=''>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.price}</p>
                                        <p>Quantity: 1</p>
                                        <p>Size: M</p>
                                    </div>
                                    <div className='flex gap-4'>
                                    <p className='mt-2'>Date: <span className='text-gray-400'> 03, Aug, 2005</span></p>
                                    <p className='mt-2'>Payment: <span className='text-gray-400'>COD</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>Ready To Ship</p>
                                </div>
                                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Orders;