import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import SearchBar from './SearchBar.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State for search visibility
    const sidebarRef = useRef(null);

    const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/loginsignup');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, []);

    return (
        <div className={`px-2 sm:px-[2vw] md:px-[3vw] lg:px-[4vw] flex items-center justify-between gap-6 sm:gap-0 py-3 sm:py-5 font-medium transition-all duration-300 ${isSticky ? 'fixed top-0 bg-white shadow-md' : ''} w-full z-10`}>

            <div className='flex items-center gap-2 sm:gap-4 ml-1 sm:ml-0'>
                <img onClick={() => setVisible(true)} className='w-8 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" aria-label="Open Menu" />

                {/* Sidebar menu for small screen */}
                {visible && (
                    <div className='fixed inset-0 bg-black bg-opacity-20 z-20 '>
                        <div ref={sidebarRef} className={`fixed top-0 left-0 bottom-0 overflow-hidden bg-white w-[75%] sm:w-[65%] md:w-[50%] rounded-l-lg shadow-lg transition-transform duration-300 ease-in-out transform`}>
                            <div className='flex flex-col text-[#222]'>
                                <div onClick={() => setVisible(false)} className='m-4 cursor-pointer'>
                                    <img src={assets.menu_icon} className='bg-gray-100 w-10 h-10 border' alt="Close" />
                                </div>
                                <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 text-lg hover:bg-gray-200 transition-colors' to='/'>HOME</NavLink>
                                <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 text-lg hover:bg-gray-200 transition-colors' to='/shop'>
                                    SHOP
                                    <img src={assets.about_icon} className='w-5' alt="" />
                                </NavLink>
                                <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 text-lg hover:bg-gray-200 transition-colors' to='/about'>ABOUT</NavLink>
                                <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 text-lg hover:bg-gray-200 transition-colors' to='/contact'>CONTACT</NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logo */}
                <Link to='/'>
                    <img src={assets.ecom_logo} alt="" className='w-[50px] h-[26px] sm:w-[60px] sm:h-[30px] lg:h-auto lg:w-[75px]' />
                </Link>
            </div>

            {/* Desktop menu */}
            <ul className='hidden sm:flex gap-8 text-base text-[#222]'>
                <NavLink to='/' className='flex flex-col items-center gap-1 group'>
                    <p className='font-medium md:text-lg'>Home</p>
                    <hr className='w-full h-[3px] bg-[#088178] scale-0 group-hover:scale-100 transition-transform duration-300' />
                </NavLink>
                <NavLink to='/shop' className='flex flex-col items-center gap-1 group'>
                    <p className='font-medium md:text-lg'>Shop</p>
                    <hr className='w-full h-[3px] bg-[#088178] scale-0 group-hover:scale-100 transition-transform duration-300' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
                    <p className='font-medium md:text-lg'>About</p>
                    <hr className='w-full h-[3px] bg-[#088178] scale-0 group-hover:scale-100 transition-transform duration-300' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
                    <p className='font-medium md:text-lg'>Contact</p>
                    <hr className='w-full h-[3px] bg-[#088178] scale-0 group-hover:scale-100 transition-transform duration-300' />
                </NavLink>
            </ul>

            {/* Search, Profile, and Cart */}
            <div className="flex items-center gap-4 sm:gap-6 mr-1 sm:mr-0">
                {/* Search Icon for Small Screens */}
                <img 
                    onClick={() => setIsSearchVisible((prev) => !prev)} 
                    className='w-7 md:hidden cursor-pointer' 
                    src={assets.search_icon} 
                    alt="Search" 
                />

                {/* Search Bar for Small Screens */}
                <SearchBar isVisible={isSearchVisible} setVisible={setIsSearchVisible} />

                <div className="group relative">
                    <img onClick={() => token ? null : navigate('/loginsignup')} src={assets.profile_icon} className="w-7 sm:min-w-8 cursor-pointer" alt="Profile" />
                    {token && (
                        <div className='absolute group-hover:block hidden dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col w-36 bg-white shadow-md rounded'>
                                <p onClick={() => navigate('/myprofile')} className='font-normal cursor-pointer px-4 py-2 text-sm hover:bg-slate-100 transition-all duration-500'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='font-normal cursor-pointer px-4 py-2 text-sm hover:bg-slate-100 transition-all duration-500'>Orders</p>
                                <p onClick={logout} className='font-normal cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-500'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                <Link to="/cart" className="relative">
                    <img src={assets.buy_cart} className="w-8 sm:min-w-9" alt="Cart" />
                    <span className="absolute right-1 top-0 sm:top-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">{getCartCount()}</span>
                </Link>
            </div>

        </div>
    );
};

export default Navbar;
