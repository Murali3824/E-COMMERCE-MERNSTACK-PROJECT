import React from 'react';
import Title from './Title';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import Slider from 'react-slick';

const NewDeals = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,               // Enable autoplay
        autoplaySpeed: 3000,          // Time limit in milliseconds for changing images
    };

    return (
        <div className="my-10 px-[2vw] sm:px-[5vw] md:px-[6vw] lg:px-[7vw] flex flex-col">
            {/* Title Section */}
            <div className='flex flex-col items-center text-center py-8 text-3xl sm:text-4xl'>
                <Title text1={'New'} text2={'DEALS'} />
                <p className='w-3/4 mt-1 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Grab the latest offers and discounts on our new arrivals!
                </p>
            </div>

            {/* Image Section */}
            {/* Carousel for small screens */}
            <div className="block sm:hidden">
                <Slider {...settings}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Link to="/shop" className="group">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={assets.new_1}
                                alt="Deal 1"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Link to="/shop" className="group">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={assets.new_2}
                                alt="Deal 2"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </Link>
                    </div>
                </Slider>
            </div>

            {/* Grid layout for larger screens */}
            <div className="hidden sm:flex justify-center items-center flex-col sm:flex-row gap-[30px] sm:gap-6 md:gap-8">
                <Link to="/shop" className="group relative overflow-hidden rounded-lg shadow-lg">
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={assets.new_1}
                        alt="Deal 1"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </Link>
                <Link to="/shop" className="group relative overflow-hidden rounded-lg shadow-lg">
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={assets.new_2}
                        alt="Deal 2"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </Link>
            </div>
        </div>
    );
};

export default NewDeals;
