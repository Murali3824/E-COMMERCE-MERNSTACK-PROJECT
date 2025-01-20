import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
    return (
        <div className='w-full flex flex-col gap-3 my-4'>
            <div className='flex flex-row justify-center gap-6  text-[15px] w-full'>
                <NavLink
                    className="flex items-center gap-3 border border-gray-300 px-3 py-3 rounded hover:bg-gray-200"
                    to="/dashboard"
                >
                    <img className='w-5 h-5' src={assets.list} alt="Dashboard Icon" />
                    <p className='hidden sm:block font-normal'>Dashboard</p>
                </NavLink>
                <NavLink
                    className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                    to="/add"
                >
                    <img className='w-5 h-5' src={assets.add_icon} alt="Add Icon" />
                    <p className='hidden sm:block font-normal'>Add Items</p>
                </NavLink>
                <NavLink
                    className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                    to="/list"
                >
                    <img className='w-5 h-5' src={assets.list} alt="List Icon" />
                    <p className='hidden sm:block font-normal'>List Items</p>
                </NavLink>
                <NavLink
                    className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded hover:bg-gray-200"
                    to="/orders"
                >
                    <img className='w-5 h-5' src={assets.order_icon} alt="Orders Icon" />
                    <p className='hidden sm:block font-normal'>Orders</p>
                </NavLink>
            </div>
            <div className='h-0.5 bg-gray-100'></div>
        </div>

    );
};

export default Sidebar;