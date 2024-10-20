import React from 'react';
import ReactLoading from 'react-loading';
import { assets } from '../assets/assets';

const LoadingOverlay = ({ type, color }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className='flex flex-col items-center justify-center'>
                <img className='' src={assets.no_product} alt="" />
                <div className="text-2xl text-white font-medium">Loading..</div>
                <ReactLoading type={type} color={color}/>
            </div>
        </div>
    );
};

export default LoadingOverlay;
