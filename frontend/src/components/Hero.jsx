import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen flex items-center justify-center bg-black">
            {/* Video Element */}
            <video 
                src={assets.banner_video} // Update this with your video path if different
                className="w-full h-full object-cover absolute top-0 left-0 z-0" 
                autoPlay 
                muted 
                loop
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>

           {/* Text Content */}
            <div className="relative z-10 text-center text-white px-4 animate-fadeIn">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-wide leading-tight drop-shadow-xl">
                    Welcome to Our Platform
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-8 drop-shadow-md max-w-2xl mx-auto">
                    Explore the future of innovation with our cutting-edge solutions.
                </p>
                <Link to='/shop'>
                    <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl rounded-full shadow-lg hover:bg-slate-100 hover:scale-105 transition-all duration-300 ease-in-out">
                        Shop Now
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Hero;
