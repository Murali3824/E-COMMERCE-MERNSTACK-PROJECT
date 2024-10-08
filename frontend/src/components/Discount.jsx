import React from 'react';
import { assets } from '../assets/assets';

const Discount = () => {
    return (
        <div className='flex flex-col justify-center items-center text-center my-14 pb-2 w-full h-max-[35vh] bg-cover bg-center' style={{ backgroundImage: `url(${assets.b4_1_img})` }}>
                <div className='leading-snug p-1'>
                    <p className='text-white text-[20px] md:text-[25px] font-semibold py-1'>Get</p>
                    <b className='text-white text-[40px] md:text-[50px] font-semibold py-2.5'>Up to <b className='text-red-600'>90% Off</b> All T-Shirts & Pants</b>
                </div>
            <button className='md:mt-2 bg-white text-black text-[20px] rounded-[4px] font-semibold px-4 py-4 md:px-8 md:py-4 text-sm active:bg-[#a3e5e1] cursor-pointer hover:bg-[#088178] hover:text-white transition duration-500'>Explore More</button>
        </div>
    );
};

export default Discount;