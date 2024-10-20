import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsetterBox from '../components/NewsetterBox';

const Contact = () => {
    return (
        <div>
            <div className='leading-[54px] p-1 flex flex-col justify-center items-center text-center w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] bg-cover bg-center' style={{ backgroundImage: `url(${assets.banner3_img})` }}>
                    <p className='text-white text-[45px] md:text-[50px] font-semibold py-2.5'>#let's_TALK</p>
                    <p className='text-white text-[14px] md:text-[16px] p-1 text-wrap'>LEAVE A MESSAGE, We Love To Hear Form You!</p>
            </div>

            {/* Contact section  */}
            <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>

                <div className='text-2xl sm:text-3xl text-center pt-10 border-t'>
                    <Title text1={'Contact'} text2={'US'}/>
                </div>
                <div className=' my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                    <img className='bg-[#F1F2F4] w-full md:max-w-[400px] lg:max-w-[500px] rounded-lg shadow-md' src={assets.contact_img} alt="" />
                    <div className='flex flex-col justify-center items-start gap-6'>
                        <b className='font-semibold text-xl text-gray-600'>Our Store</b>
                        <p className='text-gray-500'>512525 XY colony <br />Hyderabad</p>
                        <p className='text-gray-500'>Tel : (123)456-7890 <br />Email : admin@gmail.com</p>
                        <b className='font-semibold text-xl text-gray-600'>Careers at Forever</b>
                        <p className='text-gray-500'>Learn more about out teams and job openings</p>
                        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                    </div>
                </div>

            </div>

            {/* Contact form  */}
            <div className='px-4 flex justify-center '>
                <section className=" w-full sm:w-4/5 lg:w-3/5">
                    <div className=' text-center py-8 text-3xl sm:text-4xl'>
                        <Title  text1={'Leave a'} text2={'MESSAGE'}/>
                    </div>

                    <form action="https://api.web3forms.com/submit" 
                        method="post"
                        className="form"
                        data-form
                    >
                        <div className=" w-full input-wrapper gap-5 grid grid-cols-[1fr]">
                            <input type="hidden" name="access_key" value="5f960288-0acc-431b-a290-df7e24ba1693"></input>
                            <input
                                type="text"
                                name="fullname"
                                className="w-full form-input px-[13px] py-[10px] sm:py-[15px] md:py-[20px] border border-gray-600 rounded outline-none"
                                placeholder="Full name"
                                required
                                data-form-input
                            />

                            <input
                                type="email"
                                name="email"
                                className="w-full form-input px-[13px] py-[10px] sm:py-[15px] md:py-[20px] border border-gray-600 rounded outline-none"
                                placeholder="Email address"
                                required
                                data-form-input
                            />
                            <textarea
                            name="message"
                            rows="15"
                            className="w-full form-input h-[200px] mb-[25px] px-[13px] py-[20px] border border-gray-600 rounded outline-none"
                            placeholder="Your Message"
                            required
                            data-form-input
                            ></textarea>
                        </div>
                        <button type="submit" className='active:bg-gray-300 transform duration-700 rounded px-4 py-3 sm:px-8 sm:py-4 text-base bg-black text-white '>Send Message</button>
                    </form>
                </section>

            </div>

            <div>
                <NewsetterBox/>
            </div>

        </div>
    );
};

export default Contact;