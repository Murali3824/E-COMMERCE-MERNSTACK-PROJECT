import React from 'react';

const NewsetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Here you can add the logic for subscribing the user
    };

    return (
        <div className='rounded-lg p-6 text-center mt-20'>
            <p className='text-2xl font-semibold text-gray-800'>Join our community and enjoy 20% off your first order!</p>
            <p className='text-gray-600 text-sm sm:text-base mt-3'>
                Stay updated with our latest trends, exclusive deals, and fashion tips. Don't miss out on your favorites!            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto my-6'>
                <input 
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200' 
                    type="email" 
                    placeholder='Enter your email' 
                    required 
                />
                <button  
                    className='bg-black text-white text-xs px-4 sm:px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105' 
                    type='submit'
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsetterBox;
