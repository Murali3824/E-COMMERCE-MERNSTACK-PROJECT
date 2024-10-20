import React from 'react';
import { assets } from '../assets/assets';

const Discount = () => {
    return (
        <div className='px-[2vw] sm:px-[4vw] md:px-[5vw] lg:px-[6vw]'>
            <div className='flex flex-col justify-center items-center text-center my-14 w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] bg-cover bg-center' style={{ backgroundImage: `url(${assets.b4_1_img})` }}>
                <div className='leading-snug p-4 bg-black bg-opacity-50 rounded-lg'>
                    <p className='text-white text-lg md:text-xl font-semibold'>Get Ready!</p>
                    <h2 className='text-white text-3xl md:text-5xl font-bold my-2'>
                        Up to <span className='text-red-600'>90% Off</span> 
                    </h2>
                    <p className='text-white text-md md:text-lg'>All T-Shirts & Pants</p>
                </div>
                <button className='mt-4 bg-white text-black text-lg rounded-lg font-semibold px-6 py-2 transition-all duration-300 hover:bg-[#088178] hover:text-white shadow-lg'>Explore More</button>
            </div>
        </div>
    );
};

export default Discount;
