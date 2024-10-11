import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {

            e.preventDefault(); // on submiting the form which prevents page from reloading
            // console.log(email,password);
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            // console.log(response);
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-center text-2xl font-semibold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='roundeed-md w-full px-3 py-2  border border-gray-300' type="email" placeholder='youremail.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='roundeed-md w-full px-3 py-2  border border-gray-300' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='mt-2 w-full bg-[#088178] text-white font-medium px-4 py-2 ' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;