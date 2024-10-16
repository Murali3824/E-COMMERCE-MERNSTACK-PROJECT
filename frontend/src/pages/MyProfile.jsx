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
        <div className="px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] lg:[9vw]  border-t pt-16">
            <div className='text-3xl p-2'>
                <Title text1={'My'} text2={'Profile'} />
            </div>
            <div className="w-full bg-white mt-5 p-4 shadow-lg rounded-lg">
                {profileData ? (
                    <>
                        <div className="text-lg mb-2">
                            <p className='font-medium'>Username : <span> {profileData.name} </span></p>
                        </div>
                        <div className="text-lg mb-2">
                            <p className='font-medium'>Email : <span> {profileData.email} </span></p>
                        </div>
                    </>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
