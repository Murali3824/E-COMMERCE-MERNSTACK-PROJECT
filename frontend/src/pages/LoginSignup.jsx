import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginSignup = () => {

    const [currentState, setCurrentState] = useState("Login");
    const {token,setToken,navigate,backendUrl} = useContext(ShopContext)

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {

            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
                // console.log(response.data);
                if (response.data.success) {
                    toast.success("registation successfull")
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                } else {
                    toast.error(response.data.message)
                }
            }
            else {
                const response = await axios.post(backendUrl + '/api/user/login',{email,password})
                // console.log(response.data);
                if (response.data.success) {
                    toast.success("login successfull")
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                }
                else {
                    toast.error(response.data.message)
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(token) {
            navigate('/')
        }
    })

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-[#222] text-3xl font-medium'>{currentState}</p>
            </div>
            {currentState === "Sign Up" && (
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2  border border-gray-800' placeholder='Name' required />
            )}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2  border border-gray-800' placeholder='Email' required />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2  border border-gray-800' placeholder='Password' required />
            <div className='w-full flex gap-1 flex-row justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'>Forgot your password?</p>
                {
                    currentState === 'Login'
                    ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                    : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
                }
            </div>
            <button className='bg-black text-white font-light px-5 py-2 sm:px-8'>
                {
                    currentState === 'Login' 
                    ? 'Sign In'
                    : 'Sign Up'
                }
            </button>
        </form>
    );
};

export default LoginSignup;