import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';


const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link 
            to={`/product/${id}`} 
            className='group block bg-white border border-gray-200 hover:border-[#088178] shadow-sm hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden transform hover:scale-105 active:scale-95'
        >
            {/* Product Image */}
            <div className='relative w-full overflow-hidden'>
                <img 
                    className='w-full object-cover object-center group-hover:scale-110 transition-transform duration-300 ease-in-out max-h-[410px]' 
                    src={image[0]} 
                    alt={name} 
                />
            </div>
            
            {/* Product Info */}
            <div className='px-4 py-3'>
                {/* Product Name */}
                <h2 className='text-gray-800 text-base font-semibold truncate group-hover:text-[#088178] transition-colors duration-300'>
                    {name}
                </h2>

                {/* Product Price */}
                <p className='mt-2 text-gray-600 font-medium text-lg'>
                    {currency}{price}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;
