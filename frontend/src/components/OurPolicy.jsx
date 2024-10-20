import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
    return (
        <div className='mt-16 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] flex flex-col items-center'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-8'>Our Policies</h2>
            <div className='flex flex-col md:flex-row justify-center gap-8 sm:gap-12 text-center text-xs sm:text-sm md:text-base text-gray-700'>
                <div className='bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl'>
                    <img src={assets.premium_badge} className='w-12 h-12 m-auto mb-4' alt="Easy Exchange" />
                    <p className='font-semibold text-gray-800'>Premium Quality</p>
                    <p className='text-gray-500'>All the clothing products are made from 100% premium quality fabric.</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl'>
                    <img src={assets.quality_icon} className='w-12 h-12 m-auto mb-4' alt="7 Days Return" />
                    <p className='font-semibold text-gray-800'>Secure Payments</p>
                    <p className='text-gray-500'>Highly Secured SSL-Protected Payment Gateway.</p>
                </div>
                <div className='bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl'>
                    <img src={assets.return_box} className='w-12 h-12 m-auto mb-4' alt="Best Customer Support" />
                    <p className='font-semibold text-gray-800'>7 Days Return</p>
                    <p className='text-gray-500'>Return or exchange the orders within 7 days of delivery.</p>
                </div>
            </div>
        </div>
    );
};

export default OurPolicy;
