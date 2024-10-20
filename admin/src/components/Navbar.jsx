import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const Navbar = ({ setToken }) => {
    return (
        <nav className='bg-white shadow-md'>
            <div className='flex items-center justify-between py-4 px-[4%]'>
                <Link to='/' className='flex items-center space-x-2'>
                    <img 
                        className='w-[50px] h-[26px] sm:w-[60px] sm:h-[30px] lg:h-auto lg:w-[75px]' 
                        src={assets.logo} 
                        alt="Logo" 
                    />
                    <b className='font-medium text-sm sm:text-base text-gray-800'>
                        ADMIN PANEL
                    </b>
                </Link>
                <button 
                    onClick={() => setToken('')} 
                    className='bg-[#088178] text-white px-5 py-2 sm:px-7 rounded-full transition duration-200 hover:bg-[#066d66] focus:outline-none focus:ring-2 focus:ring-[#088178] focus:ring-opacity-50'
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
