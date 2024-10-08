import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';

const LatestCollections = () => {

    const {products} = useContext(ShopContext);
    // console.log(products);

    const [latestProducts,setLatestProducts] = useState([])

    useEffect( () => {
        setLatestProducts(products.slice(0,10));
    },[products])

    return (
        <div className='my-10 px-2 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>
            <div className='flex flex-col items-center text-center py-8 text-3xl sm:text-4xl'>
                <Title text1={'Latest'} text2={'COLLECTIONS'}/>
                <p className='w-3/4 mt-1 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas repellat
                </p>
            </div>
            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 gap-y-6'>
                {
                    latestProducts.map((item,index)=>(
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestCollections;