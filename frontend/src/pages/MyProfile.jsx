import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';

const MyProfile = () => {
    const { token, backendUrl } = useContext(ShopContext); 
    const [profileData, setProfileData] = useState(null); 
    const [editMode, setEditMode] = useState(false); // Toggle between view and edit mode
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email:'',
        avatarUrl: ''
    });
    const [file, setFile] = useState(null); // File for profile image upload

    // Function to fetch profile data
    const fetchProfileData = async () => {
        try {
            if (!token) return;
            
            const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
            
            if (response.data.success) {
                // Ensure that the updated avatarUrl is prioritized and set in the state
                setProfileData(response.data.user);
                setFormData({
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    email:response.data.user.email,
                    avatarUrl: response.data.user.avatarUrl,  // Ensure avatarUrl is included here
                });
            } else {
                toast.error(response.data.message || 'Error fetching profile');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    const handleUpdateProfile = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('userId', profileData._id);
            formDataToSend.append('firstname', formData.firstname);
            formDataToSend.append('lastname', formData.lastname);
            formDataToSend.append('email',formData.email)
    
            if (file) {
                formDataToSend.append('avatar', file);
            }
    
            const response = await axios.put(backendUrl + '/api/user/updateprofile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token,
                },
            });
    
            if (response.data.success) {
                toast.success('Profile updated successfully!');
                
                // Ensure the new avatar URL is saved and displayed
                setProfileData(response.data.user);
                console.log(response.data.user.email);
                setFormData({
                    firstname: response.data.user.firstname,
                    lastname: response.data.user.lastname,
                    avatarUrl: response.data.user.avatarUrl,
                    email:response.data.user.email,
                });
                setEditMode(false); // Exit edit mode
            } else {
                toast.error(response.data.message || 'Error updating profile');
            }
        } catch (error) {
            console.log('Error during profile update:', error);
            toast.error('An unexpected error occurred');
        }
    };
    
    // Handle file selection for avatar upload
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Use useEffect to fetch profile data on component mount
    useEffect(() => {
        fetchProfileData();
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-3xl text-center mb-6">
                    <Title text1={'My'} text2={'Profile'} />
                </div>
                <div className="flex flex-col items-center space-y-6">
                    {profileData ? (
                        <>
                        {/* Avatar with hover effect */}
                        <div className="relative w-36 h-36">
                            <img 
                                src={formData.avatarUrl} 
                                alt="Profile Avatar" 
                                className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-gray-200 transition-all hover:scale-105"
                            />
                            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-white border-2"></div>
                        </div>

                        {/* File input for profile image */}
                        {editMode && (
                            <div className="mt-4 w-full">
                                <input 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 
                                    file:mr-4 file:py-2 file:px-4 
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-600
                                    hover:file:bg-blue-100
                                    cursor-pointer"
                                />
                            </div>
                        )}

                        {/* User's Name */}
                        {editMode ? (
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    value={formData.firstname} 
                                    onChange={handleInputChange} 
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="First Name" 
                                />
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    value={formData.lastname} 
                                    onChange={handleInputChange} 
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last Name" 
                                />
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last Name" 
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="text-center">
                                    <p className="text-xl font-medium text-gray-700">
                                        {profileData.firstname} {profileData.lastname}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-6">Username</p>
                                </div>
                                {/* User's Email */}
                                <div className="text-center">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Email:</span> {profileData.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Buttons for Edit/Save */}
                        <div className="mt-6">
                            {editMode ? (
                                <div className="flex space-x-4">
                                    <button 
                                        onClick={handleUpdateProfile} 
                                        className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditMode(false)} 
                                        className="bg-gray-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setEditMode(true)} 
                                    className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
                                >
                                    Edit Profile
                                </button>
                            )}
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
