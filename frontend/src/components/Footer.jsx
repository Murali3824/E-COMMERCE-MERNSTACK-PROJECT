import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] py-10 mt-36 bg-gray-100">
            {/* Top Section */}
            <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 my-10  text-sm text-gray-700">
                
                {/* Logo and Description */}
                <div>
                    <img src={assets.ecom_logo} alt="E-commerce logo" className="mb-5 w-[75px]" />
                    <p className="w-full md:w-2/3 mb-4 text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero excepturi illo praesentium dolore soluta itaque.
                    </p>
                    <p className="text-lg font-medium mt-6 mb-3">Follow us</p>
                    <div className="flex gap-4 text-gray-500 text-lg">
                        <Link to="#facebook" className="hover:text-[#088178]"><FaFacebook /></Link>
                        <Link to="#twitter" className="hover:text-[#088178]"><FaTwitter /></Link>
                        <Link to="#instagram" className="hover:text-[#088178]"><FaInstagram /></Link>
                        <Link to="#youtube" className="hover:text-[#088178]"><FaYoutube /></Link>
                        <Link to="#pinterest" className="hover:text-[#088178]"><FaPinterest /></Link>
                    </div>
                </div>
                
                {/* About Section */}
                <div>
                    <p className="text-lg font-medium mb-4">About</p>
                    <ul className="space-y-2 text-gray-600">
                        <li><Link className="hover:text-[#088178] transition" to="/about">About us</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/contact">Contact Us</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/orders">Delivery Information</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/#">Privacy Policy</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/#">Terms & Conditions</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/#">Cancellation Policy</Link></li>
                    </ul>
                </div>

                {/* My Account Section */}
                <div>
                    <p className="text-lg font-medium mb-4">My Account</p>
                    <ul className="space-y-2 text-gray-600">
                        <li><Link className="hover:text-[#088178] transition" to="/loginsignup">Sign In</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/cart">View Cart</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/orders">Track My Order</Link></li>
                        <li><Link className="hover:text-[#088178] transition" to="/contact">Help</Link></li>
                    </ul>
                </div>

                {/* Get In Touch Section */}
                <div>
                    <p className="text-lg font-medium mb-4">Get in Touch</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>Phone: +1-234-567-8901</li>
                        <li>Email: contact@ecommerce.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 pt-5">
                <p className="text-center text-sm text-gray-500">
                    &copy; 2024 ecommerce.com - All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
