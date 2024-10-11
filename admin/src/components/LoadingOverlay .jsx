import React from 'react';
import ReactLoading from 'react-loading';

const LoadingOverlay = ({ type, color }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-2xl text-white font-medium">Loading...</div>
            <ReactLoading type={type} color={color}/>
        </div>
    );
};

export default LoadingOverlay;
