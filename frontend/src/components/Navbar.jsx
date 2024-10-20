import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import SearchBar from './SearchBar.jsx'

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const sidebarRef = useRef(null);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

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
        <div className={`px-3 sm:px-[2vw] md:px-[3vw] lg:px-[4vw] flex items-center justify-between py-5 font-medium transition-all duration-300 ${isSticky ? 'fixed top-0 bg-white shadow-md' : ''} w-full z-10`}>

            <div className='flex items-center gap-4 ml-1 sm:ml-0'>

                <img onClick={() => setVisible(true)} className='w-7 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu" aria-label="Open Menu" />
                
                {/* Sidebar menu for small screen */}
                {visible && (
                    <div className='fixed inset-0 bg-black bg-opacity-20 z-20 '>
                        <div  ref={sidebarRef}  className={`fixed top-0 left-0 bottom-0 overflow-hidden bg-white w-[75%] sm:w-[65%] md:w-[50%] rounded-l-lg shadow-lg transition-transform duration-300 ease-in-out transform`} >
                            <div className='flex flex-col text-[#222]'>
                                <div onClick={() => setVisible(false)} className='m-4 mt-6 p-2 cursor-pointer flex justify-end'>
                                    <img src={assets.cross_icon} className='bg-gray-100 w-9 h-9 p-2 border' alt="Close" />
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
                {/* Logo  */}
                <Link to='/'>
                    <img src={assets.ecom_logo} alt="" className='w-[50px] h-[26px] sm:w-[60px] sm:h-[30px] lg:h-auto lg:w-[75px]' />
                </Link>
                {/* <b className="text-4xl font-semibold bg-gradient-to-r from-[#088178] to-purple-500 bg-clip-text text-transparent">Ecom</b> */}
            
            </div>


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

            {/* Icons and Cart */}
            <div className='flex items-center gap-6 mr-2.5 sm:mr-0'>
                <Link>
                    <SearchBar/>
                    {/* <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> */}
                </Link>
                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/loginsignup')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
                    {token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col w-36 bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/myprofile')} className='cursor-pointer px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'>Orders</p>
                                <p onClick={logout} className='cursor-pointer px-4 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.checkout} className='w-8 min-w-5 cursor-pointer' alt="" />
                    <p className='absolute right-[6px] bottom-[14px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
