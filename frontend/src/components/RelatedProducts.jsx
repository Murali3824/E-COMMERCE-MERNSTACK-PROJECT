import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const RelatedProducts = ({category,subCategory}) => {
    
    const {products} = useContext(ShopContext);
    const [relatedProducts,setRelatedProducts] = useState([]);

    useEffect( () => {
        if (products.length > 0) {

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            // console.log(productsCopy.slice(0,4));
            setRelatedProducts(productsCopy.slice(0,4));
        }
    },[products])

    return (
        <div className='my-14'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            {/* Rendering Products */}
            <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 gap-y-6'>
                {
                    relatedProducts.map((item,index)=>(
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
            <div className='text-center my-10'>
                <Link to='/shop' className='group inline-block sm:h-[52px] leading-[49px] bg-[#000000] hover:bg-[#088178] transform transition ease-in-out duration-300 rounded-[2px] px-4 sm:px-7 md:px-9  align-middle text-[#fff] text-sm sm:tracking-[0.75px]  relative overflow-hidden'>
                    <div className='flex items-center gap-4'>
                        <span>VIEW ALL PRODUCTS</span>
                        <FaArrowRightLong className='transform sm:group-hover:translate-x-3 ease-in-out duration-500' />
                    </div>
                </Link>
            </div>
        </div>
        
    );
};

export default RelatedProducts;