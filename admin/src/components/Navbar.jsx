import React from 'react';
import {assets} from '../assets/assets.js'
import { Link } from 'react-router-dom';

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between py-2 px-[4%] '>
            <Link to='/add'>
                <img className='w-[50px] h-[26px] sm:w-[60px] sm:h-[30px] lg:h-auto lg:w-[75px]' src={assets.logo} alt="" />
                <b className='font-medium text-sm sm:text-base'>ADMIN PANEL</b>
            </Link>
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full'>Logout</button>
        </div>
    );
};

export default Navbar;