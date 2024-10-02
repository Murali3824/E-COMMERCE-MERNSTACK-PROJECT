import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsetterBox from '../components/NewsetterBox';

const About = () => {
    return (
        <div>
            
            <div className='text-2xl text-center pt-10 border-t'>
                <Title text1={'ABOUT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p className='text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eos provident consectetur placeat voluptas, vero at unde cum quo nesciunt dolorum nulla dolores exercitationem? Eveniet dignissimos ducimus doloremque ut debitis tenetur autem sit ab, repellendus nobis distinctio tempora officiis, nisi necessitatibus quisquam nesciunt, iure soluta architecto impedit libero minima corporis!</p>
                    <p className='text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus distinctio, officiis repellat necessitatibus eos sequi consectetur itaque qui nostrum optio perspiciatis doloremque iste expedita explicabo dolorum, sapiente cupiditate ea quisquam asperiores. Ratione eaque sunt id?</p>
                    <b className='font-semibold text-lg text-gray-800'>Our Mission</b>
                    <p className='text-base'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere quidem unde consequuntur fugiat dolore quibusdam perspiciatis minus voluptas vero rem. Aspernatur repudiandae eaque, recusandae dolorum necessitatibus fugit quisquam?</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
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
            <div className='mt-28'>
                <NewsetterBox/>
            </div>

        </div>
    );
};

export default About;