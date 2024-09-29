import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-36 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero excepturi illo praesentium dolore soluta itaque, quasi tempore nisi! Quasi sequi, enim eligendi dolor modi similique velit quis unde esse dolores nisi. Corrupti labore repellendus cupiditate, nihil quidem earum est. Repudiandae iste dolorum, omnis ullam vel quia quos assumenda distinctio hic!
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-234-567-8901</li>
                        <li>contact@foreveryou.com</li>
                    </ul>
                </div>
            </div>
            <div className=''>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;