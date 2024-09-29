import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link className='text-gray-700 cursor-pointer hover:scale-105 ease-in-out duration-300' to={`/product/${id}`}>
            <div className='overflow-hidden '>
                <img className='' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm font-medium'>{name}</p>
            <p className='text-sm font-semibold'>{currency}{price}</p>
        </Link>
    );
};

export default ProductItem;