import React from 'react';

const CustomToast = ({ closeToast, title, message, icon }) => (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 space-x-4 max-w-xs mx-auto">
        <div className="flex-shrink-0">
            <img src={icon} alt="Toast Icon" className="w-8 h-8" />
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-gray-600">{message}</p>
        </div>
        <button onClick={closeToast} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            &times;
        </button>
    </div>
);

export default CustomToast;
