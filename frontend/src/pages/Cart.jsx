import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        // Verify product exists before adding to cart
                        const productExists = products.find(product => product._id === items);
                        if (productExists) {
                            tempData.push({
                                _id: items,
                                size: item,
                                quantity: cartItems[items][item],
                            });
                        }
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    // Helper function to safely get product data
    const getProductData = (productId) => {
        return products.find((product) => product._id === productId);
    };

    return (
        <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] border-t pt-14'>
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-6'>
                <div>
                    <div className='text-2xl sm:text-3xl mb-3'>
                        <Title text1={'Your'} text2={'CART'} />
                    </div>

                    {cartData.length > 0 ? (
                        cartData.map((item, index) => {
                            const productData = getProductData(item._id);
                            // Skip rendering if product data is not found
                            if (!productData) return null;

                            return (
                                <div key={index} className='p-4 border-b flex gap-6 items-center'>
                                    <img className='w-20' src={productData.image[0]} alt={productData.name} />
                                    <div className='flex-grow'>
                                        <p className='text-sm sm:text-lg text-gray-700 font-medium'>{productData.name}</p>
                                        <p className='text-sm font-medium'>{currency}{productData.price}</p>
                                        <p className='text-sm text-gray-700 font-normal'>Size: <span className='text-black font-normal'>{item.size}</span></p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            onChange={(e) =>
                                                e.target.value === '' || e.target.value === '0'
                                                    ? null
                                                    : updateQuantity(item._id, item.size, Number(e.target.value))
                                            }
                                            className='border w-12 px-2 py-1 text-center'
                                            type='number'
                                            min={1}
                                            defaultValue={item.quantity}
                                        />
                                        <img
                                            onClick={() => updateQuantity(item._id, item.size, 0)}
                                            className='w-5 cursor-pointer'
                                            src={assets.bin_icon}
                                            alt='Remove'
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='flex flex-col items-center justify-center py-10'>
                            <img className='lg:w-1/5 mb-4' src={assets.no_product} alt='No products available' />
                            <p className='text-lg font-medium'>Your cart is empty.</p>
                        </div>
                    )}
                </div>

                <div className='flex justify-end my-12'>
                    <div className='w-full lg:w-[350px] xl:w-[450px]'>
                        <CartTotal />
                        <button 
                            disabled={cartData.length === 0} 
                            onClick={() => navigate('/placeorder')} 
                            className='w-full mt-4 bg-black cursor-pointer text-white py-3 rounded'
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;