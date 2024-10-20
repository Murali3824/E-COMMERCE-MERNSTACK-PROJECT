import React from 'react';
import { assets } from '../assets/assets';

const Offers = () => {
    return (
        <div className='px-[2vw] sm:px-[5vw] md:px-[6vw] lg:px-[7vw] my-20'>
            {/* First Offer */}
            <div 
                className='group flex flex-col justify-center items-start p-5 sm:p-8 bg-cover bg-center rounded-t-lg shadow-lg transition-transform duration-300' 
                style={{ backgroundImage: `url(${assets.b9_img})` }}
            >
                <div className='flex flex-col items-start bg-black bg-opacity-50 p-5 rounded-lg'>
                    <h4 className='text-white text-lg font-semibold tracking-wide'>Crazy Deals</h4>
                    <h2 className='text-white text-2xl sm:text-3xl font-extrabold my-2'>Buy 2 Get 1 Free</h2>
                    <span className='text-white text-sm font-medium pb-3'>Discover amazing savings on our bestsellers!</span>
                    <button className='text-sm font-semibold px-5 py-3 rounded bg-white text-black group-hover:bg-[#088178] group-hover:text-white transition duration-300'>
                        Learn More
                    </button>
                </div>
            </div>

            {/* Second Offer */}
            <div 
                className='group flex flex-col justify-center items-start p-5 sm:p-8 bg-cover bg-center rounded-b-lg shadow-lg transition-transform duration-300 h-[45vh]' 
                style={{ backgroundImage: `url(${assets.hero_img})` }}
            >
                <div className='flex flex-col items-start bg-black bg-opacity-50 p-5 rounded-lg'>
                    <h4 className='text-white text-lg font-semibold tracking-wide'>Spring / Summer</h4>
                    <h2 className='text-white text-2xl sm:text-3xl font-extrabold my-2'>Upcoming Season</h2>
                    <span className='text-white text-sm font-medium pb-3'>Get ready for the latest trends!</span>
                    <button className='text-sm font-semibold px-5 py-3 rounded bg-white text-black group-hover:bg-[#088178] group-hover:text-white transition duration-300'>
                        View Collection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Offers;
