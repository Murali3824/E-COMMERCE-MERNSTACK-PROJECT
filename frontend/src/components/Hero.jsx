import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import TextAnimi from './TextAnimi';

const Hero = () => {
    return (
        <div className='w-full bg-[#E3E5F1] flex flex-col sm:flex-row border border-gray-200 shadow-lg'>
            {/* Hero left side */}
            <div className='w-full sm:w-1/2 flex flex-col gap-6 items-center justify-center p-8 sm:p-12'>
                <div className='flex flex-col gap-4 sm:text-left'>
                    <b className='text-[#222] font-semibold text-3xl lg:text-5xl'>
                        Exclusive Discounts
                    </b>
                    <b className='text-[#222] font-medium text-3xl lg:text-5xl'>
                        On all<TextAnimi />
                    </b>
                </div>
                <Link to='/shop' className=' cursor-pointer w-52  text-sm bg-cover bg-center  mt-5 p-2 text-[#088178]' style={{ backgroundImage: `url(${assets.button_bg})` }}>
                    <p className='text-center px-4 font-medium text-sm md:text-base'>Shop Now </p>
                </Link>
            </div>

            {/* Hero right side */}
            <div className='w-full sm:w-1/2'>
                <img
                    className='w-full h-auto object-cover'
                    src={assets.b1_img}
                    alt="Discount Banner"
                />
            </div>
        </div>
    );
};

export default Hero;
