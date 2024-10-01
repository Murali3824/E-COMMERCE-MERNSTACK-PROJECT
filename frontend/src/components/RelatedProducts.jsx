import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {
    
    const {products} = useContext(ShopContext);
    const [relatedProducts,setRelatedProducts] = useState([]);

    useEffect( () => {
        if (products.length > 0) {

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            // console.log(productsCopy.slice(0,5));
            setRelatedProducts(productsCopy.slice(0,5));
        }
    },[products])

    return (
        <div className='my-24'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
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
        </div>
        
    );
};

export default RelatedProducts;