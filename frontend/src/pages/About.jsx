import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsetterBox from '../components/NewsetterBox';

const About = () => {
    return (
        <div>
            <div className='leading-[54px] p-1 flex flex-col justify-center items-center text-center w-full h-max-[35vh] sm:h-[35vh] bg-cover bg-center' style={{ backgroundImage: `url(${assets.banner_img})` }}>
                <p className='text-white text-[45px] md:text-[50px] font-semibold py-2.5'>#KnowUS</p>
                <p className='text-white text-[14px] md:text-[16px] p-1 text-wrap'>positive feelings about the ecommerce brand</p>
            </div>
            <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>
            
                <div className='text-2xl sm:text-3xl text-center pt-10 border-t'>
                    <Title text1={'About'} text2={'US'}/>
                </div>
                <div className='my-10 flex flex-col md:flex-row gap-8'>
                    <div className='w-full flex justify-center md:w-1/2'>
                        <img 
                            className='w-full md:max-w-[400px] lg:max-w-[500px] max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-cover rounded-lg shadow-md' 
                            src={assets.about_img} 
                            alt="About Us" 
                        />
                    </div>
                    <div className='flex flex-col justify-center md:w-1/2 text-gray-600'>
                        <p className='text-base leading-relaxed'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eos provident consectetur placeat voluptas, vero at unde cum quo nesciunt dolorum nulla dolores exercitationem? Eveniet dignissimos ducimus doloremque ut debitis tenetur autem sit ab, repellendus nobis distinctio tempora officiis, nisi necessitatibus quisquam.
                        </p>
                        <b className='font-semibold text-lg text-gray-800 mt-4 md:mt-6'>
                            Our Mission
                        </b>
                        <p className='text-base leading-relaxed mt-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere quidem unde consequuntur fugiat dolore quibusdam perspiciatis minus voluptas vero rem. Aspernatur repudiandae eaque, recusandae dolorum necessitatibus fugit quisquam?
                        </p>
                    </div>
                </div>

                <div className='sm:text-2xl text-xl py-4'>
                    <Title text1={'Why'} text2={'CHOOSE US'}/>
                </div>
                <div className='flex flex-col md:flex-row text-sm mb-20 mt-5'>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Quality Assurance</b>
                        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ullam dolor quam quo, tempora inventore?</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Convenience</b>
                        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ullam dolor quam quo, tempora inventore?</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Exceptional Customer Service:</b>
                        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In ullam dolor quam quo, tempora inventore?</p>
                    </div>

                </div>
                

            </div>

            <div>
                <NewsetterBox/>
            </div>

        </div>
        
    );
};

export default About;