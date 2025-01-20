import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // For loading state

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent page from reloading
        setLoading(true); // Set loading state

        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                toast.success('Login successful!'); // Success message
            } else {
                toast.error(response.data.message); // Error message
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message); // Display error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white shadow-lg rounded-lg px-8 py-6 lg:w-2/6 xl:max-w-md'>
                <h1 className='text-center text-2xl font-bold mb-6 text-gray-800'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#088178] transition duration-200'
                            type="email"
                            placeholder='youremail@example.com'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#088178] transition duration-200'
                            type="password"
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button
                        className={`mt-4 w-full bg-[#088178] text-white font-semibold px-4 py-2 rounded-md transition duration-200 hover:bg-[#066d66] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type='submit'
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
