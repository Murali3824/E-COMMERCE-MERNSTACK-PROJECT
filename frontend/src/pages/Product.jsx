import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Reviews from '../components/Reviews';

const Product = () => {
    const { productId } = useParams();
    const { products,currency,addToCart, } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image,setImage] = useState('')
    const [size,setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            
            if (item._id === productId) {
                setProductData(item)
                // console.log(item);
                setImage(item.image[0])
                return null;
            }
        })
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product data  */}
            <div className='flex gap-12 sm:gap-12 flex-col md:flex-row'>

                {/* Product images  */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

                    {/* Thumbnail Images */}
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full '>
                        {
                            productData.image.map((item,index) => (
                                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg'/>
                            ))
                        }
                    </div>

                    {/* Main Display Image */}
                    <div className='w-full  sm:w-[80%] object-cover rounded-lg'>
                        <img  className='w-full h-auto object-cover rounded-lg' src={image} alt="Selected product" />
                    </div>
                </div>

                {/* Product Information */}
                <div className="flex-1">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-3">{productData.name}</h1>
                    <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, index) => (
                            <img key={index} src={assets.star_icon} alt="Star" className="w-4" />
                        ))}
                        <img src={assets.star_dull_icon} alt="Dull Star" className="w-4" />
                        <p className="pl-2 text-gray-500">(3817 reviews)</p>
                    </div>
                    <p className="mt-5 text-xl font-semibold text-[#088178]">
                        Price: {currency}{productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5 leading-6">
                        {productData.description}
                    </p>

                    {/* Size Selection */}
                    <div className="my-8">
                        <p className="font-medium">Select Size</p>
                        <div className="flex gap-2 mt-3">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-5 py-2 border rounded-lg transition ${
                                        item === size ? 'bg-[#088178] text-white' : 'bg-white text-gray-800 border-gray-300'
                                    } hover:bg-[#088178] hover:text-white`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="bg-[#088178] text-white px-8 py-3 rounded-lg text-sm font-semibold transition hover:bg-[#065a4b]"
                    >
                        ADD TO CART
                    </button>
                </div>

            </div>
            
            {/* Review Section  */}
            
            <Reviews/>

            {/* Display related products  */}

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
    ) : (
        <div className='flex flex-col items-center justify-center'>
            <img className='w-1/6' src={assets.no_product} alt="" />
            <p className="text-lg font-medium">Loading Product data...</p>
        </div>
    )
};

export default Product;
