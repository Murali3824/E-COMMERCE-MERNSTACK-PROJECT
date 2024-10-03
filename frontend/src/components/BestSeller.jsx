import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    // console.log(products);

    const [bestSeller,setBestSeller] = useState([])

    useEffect( () => {
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,4))
    },[])

    return (
        <div className='my-10 px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw]'>
            <div className='flex flex-col items-center text-center py-8 text-3xl sm:text-4xl'>
                <Title  text1={' Best'} text2={'SELLERS'}/>
                <p className='w-3/4 mt-1 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas repellat
                </p>
            </div>
            {/* Rendering Products */}
            <div className='flex flex-col justify-center items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    bestSeller.map((item,index)=>(
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

export default BestSeller;