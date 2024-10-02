import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsetterBox from '../components/NewsetterBox';

const Contact = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <b className='font-semibold text-xl text-gray-600'>Our Store</b>
                    <p className='text-gray-500'>505525 BC colony <br />kummarikunta</p>
                    <p className='text-gray-500'>Tel:(123)456-7890 <br />Email:admin@gmail.com</p>
                    <b className='font-semibold text-xl text-gray-600'>Careers at Forever</b>
                    <p className='text-gray-500'>Learn more about out teams and job openings</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>
            <div>
                <NewsetterBox/>
            </div>
        </div>
    );
};

export default Contact;