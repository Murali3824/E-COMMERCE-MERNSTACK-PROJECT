import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsetterBox from '../components/NewsetterBox';
import OurPolicy from '../components/OurPolicy';

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className='leading-[54px] p-1 flex flex-col justify-center items-center text-center w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh]  bg-cover bg-center' style={{ backgroundImage: `url(${assets.banner_img})` }}>
                <p className='text-white text-[45px] md:text-[50px] font-semibold py-2.5'>#Know US</p>
                <p className='text-white text-[14px] md:text-[16px] p-1'>Positive feelings about the eCommerce brand</p>
            </div>

            {/* About Section */}
            <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>
                {/* About content */}
                <div>
                    <div className='text-2xl sm:text-3xl text-center pt-10 border-t border-gray-300'>
                        <Title text1={'About'} text2={'US'} />
                    </div>
                    <div className='my-10 flex flex-col md:flex-row gap-8'>
                        <div className='w-full flex justify-center md:w-1/2'>
                            <img 
                                className='w-full md:max-w-[400px] lg:max-w-[500px] max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-cover rounded-lg shadow-lg' 
                                src={assets.about_img} 
                                alt="About Us" 
                            />
                        </div>
                        <div className='flex flex-col justify-center md:w-1/2 text-gray-600'>
                            <p className='text-base leading-relaxed'>
                                At our core, we believe in delivering quality and ensuring a seamless shopping experience. Our journey started with a vision to provide customers with the best products and services available.
                            </p>
                            <b className='font-semibold text-lg text-gray-800 mt-4 md:mt-6'>Our Mission</b>
                            <p className='text-base leading-relaxed mt-2'>
                                We aim to revolutionize online shopping by providing top-notch products at competitive prices while ensuring customer satisfaction at every step.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div>
                    <div className='sm:text-2xl text-xl py-4'>
                        <Title text1={'Why'} text2={'CHOOSE US'} />
                    </div>
                    <div className='flex flex-col md:flex-row text-sm mb-20 mt-5 gap-5'>
                        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md'>
                            <b className='text-lg'>Quality Assurance</b>
                            <p className='text-gray-600'>We prioritize quality in every product we offer, ensuring you receive the best value for your money.</p>
                        </div>
                        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md'>
                            <b className='text-lg'>Convenience</b>
                            <p className='text-gray-600'>Our user-friendly platform makes shopping a breeze, allowing you to find what you need quickly.</p>
                        </div>
                        <div className='border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md'>
                            <b className='text-lg'>Exceptional Customer Service</b>
                            <p className='text-gray-600'>Our dedicated support team is here to assist you with any queries or issues, ensuring a smooth shopping experience.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Policy Section  */}
            <div>
                <OurPolicy/>
            </div>
            
            {/* Newsletter Section */}
            <div>
                <NewsetterBox />
            </div>

        </div>
    );
};

export default About;
