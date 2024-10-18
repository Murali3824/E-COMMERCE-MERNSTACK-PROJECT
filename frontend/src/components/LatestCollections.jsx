import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const LatestCollections = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Display the latest products first by slicing and then reversing the sliced array
        const latest = [...products].slice(-8).reverse();
        setLatestProducts(latest);
    }, [products]);

    return (
        <div className='my-10 px-[2vw] sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>
            <div className='flex flex-col items-center text-center py-8 text-3xl sm:text-4xl'>
                <Title text1={'Latest'} text2={'COLLECTIONS'} />
                <p className='w-3/4 mt-1 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover the most recent additions to our collection. Shop the latest trends!
                </p>
            </div>
            
            {/* Rendering Products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </div>

            <div className='text-center my-10'>
                <Link to='/shop' className='group inline-block sm:h-[52px] leading-[49px] bg-[#000000] hover:bg-[#088178] transform transition ease-in-out duration-300 rounded-[2px] px-4 sm:px-7 md:px-9 align-middle text-[#fff] text-sm sm:tracking-[0.75px] relative overflow-hidden'>
                    <div className='flex items-center gap-4'>
                        <span>VIEW ALL PRODUCTS</span>
                        <FaArrowRightLong className='transform sm:group-hover:translate-x-3 ease-in-out duration-500' />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LatestCollections;
