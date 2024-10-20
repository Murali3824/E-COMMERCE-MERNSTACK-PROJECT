import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginSignup = () => {

    const [currentState, setCurrentState] = useState("Login");
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (response.data.success) {
                    toast.success("Registration successful");
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password });
                if (response.data.success) {
                    toast.success("Login successful");
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-gray-800'>
            {/* Title */}
            <div className='inline-flex items-center gap-2 mb-6 mt-10'>
                <p className='text-[#222] text-3xl font-semibold'>{currentState}</p>
            </div>

            {/* Input fields */}
            {currentState === "Sign Up" && (
                <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    type="text" 
                    className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#088178] transition-all' 
                    placeholder='Name' 
                    required 
                />
            )}
            <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#088178] transition-all' 
                placeholder='Email' 
                required 
            />
            <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#088178] transition-all' 
                placeholder='Password' 
                required 
            />

            {/* Forgot password and toggle options */}
            <div className='w-full text-sm mt-[-8px]'>
                {currentState === 'Login' ? (
                    <div className='flex justify-between gap-10'>
                        <p className='cursor-pointer text-[#088178] font-normal hover:underline'>Forgot your password?</p>
                        <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer font-normal text-[#088178] hover:underline'>Create account</p>
                    </div>
                ) : (
                    <div className='flex justify-between gap-10'>
                        <p className='cursor-pointer text-[#088178] font-normal hover:underline'>Forgot your password?</p>
                        <p onClick={() => setCurrentState('Login')} className='cursor-pointer font-normal text-[#088178] hover:underline'>Login Here</p>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button 
                className='w-full bg-[#088178] text-white py-3 rounded-md font-medium hover:bg-[#066a5c] transition-all'>
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    );
};

export default LoginSignup;
