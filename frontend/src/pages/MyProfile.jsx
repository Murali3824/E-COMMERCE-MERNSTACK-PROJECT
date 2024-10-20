import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';

const MyProfile = () => {
    const { token, backendUrl } = useContext(ShopContext); 
    const [profileData, setProfileData] = useState(null); 

    // Function to fetch profile data
    const fetchProfileData = async () => {
        try {
            if (!token) {
                return;
            }
        
            const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
        
            if (response.data.success) {
                console.log(response.data.user);
                setProfileData(response.data.user);
            } else {
                toast.error(response.data.message || 'Error fetching profile');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } 
    };

    // Use useEffect to fetch profile data on component mount
    useEffect(() => {
        fetchProfileData();
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
                <div className="text-2xl text-center mb-6">
                    <Title text1={'My'} text2={'Profile'} />
                </div>
                <div className="flex flex-col items-center">
                    {profileData ? (
                        <>
                            {/* Display the avatar */}
                            <div className="mb-4">
                                <img 
                                    src={profileData.avatarUrl} 
                                    alt="Profile Avatar" 
                                    className="w-32 h-32 rounded-full shadow-lg transition-transform transform hover:scale-110" 
                                />
                            </div>

                            {/* Display the user's name and email */}
                            <div className="text-center mb-4">
                                <p className="text-gray-700 text-lg">Username: 
                                    <span className="text-black font-semibold"> {profileData.name}</span>
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-700 text-lg">Email: 
                                    <span className="text-black font-semibold"> {profileData.email}</span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">Loading profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
