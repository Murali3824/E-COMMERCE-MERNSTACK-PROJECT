import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';

const Features = () => {
    return (
        <div className='px-2 sm:px-[4vw] md:px-[5vw] lg:px-[6vw] my-10  flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center text-center py-8 text-3xl sm:text-4xl'>
                <Title text1={'Provide By'} text2={'USER'}/>
            </div>
            <div className=' grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 '>
            
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img src={assets.f1_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#fddde4] text-[12px] font-bold'>Free Shipping</h6>
                </div>
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img src={assets.f2_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#cdebbc] text-[12px] font-bold'>Online Order</h6>
                </div>
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img src={assets.f3_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#d1e8f2] text-[12px] font-bold'>Save money</h6>
                </div>
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img src={assets.f4_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#cdd4f8] text-[12px] font-bold'>Promotions</h6>
                </div>
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img src={assets.f5_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#f6dbf6] text-[12px] font-bold'>Happy Sell</h6>
                </div>
                <div className='w-[180px] text-center p-6 border border-[#cce7d0] rounded-lg my-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col gap-3 justify-center items-center'>
                    <img className='' src={assets.f6_img} alt="Save money" />
                    <h6 className='inline-block px-4 py-2 rounded-full text-[#088178] bg-[#d1e8f2] text-[12px] font-bold'>24x7 Support</h6>
                </div>
            </div>
        </div>
    );
};

export default Features;