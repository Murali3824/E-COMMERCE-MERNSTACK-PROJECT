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
        
            const response = await axios.post(backendUrl + '/api/user/profile', {}, {headers:{token}});
        
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
        <div className="px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] lg:[9vw] border-t flex justify-center items-center sm:min-h-screen   bg-gray-50">
            <div className="my-20 sm:my-0 max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-xl text-center mb-6">
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
                                    className="w-24 h-24 rounded-full shadow-md" 
                                />
                            </div>

                            {/* Display the user's name and email */}
                            <div className="text-center text-lg mb-2">
                                <p className="text-gray-700 font-normal">Username : <span className="text-black font-normal">{profileData.name}</span></p>
                            </div>
                            <div className="text-center text-lg font-semibold">
                                <p className="text-gray-700 font-normal">Email : <span className="text-black font-normal">{profileData.email}</span></p>
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
