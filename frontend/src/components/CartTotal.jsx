import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    // Calculate total amount (subtotal + delivery fee)
    const totalAmount = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee;

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
            {/* Title */}
            <h3 className='text-xl font-semibold mb-4'>Price Detail</h3>

            {/* Subtotal */}
            <div className='flex justify-between font-normal text-sm sm:text-base mb-3'>
                <p className='text-gray-700'>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>

            {/* Delivery Fee */}
            <div className='flex justify-between font-normal text-sm sm:text-base mb-3'>
                <p className='text-gray-700'>Delivery</p>
                <p className='text-green-700'>
                    {delivery_fee === 0 ? 'Free Delivery' : `${currency}${delivery_fee}.00`}
                </p>
            </div>

            {/* Horizontal Divider */}
            <hr className='my-4' />

            {/* Total */}
            <div className='flex justify-between items-center'>
                <p className='font-medium text-lg'>Total Amount</p>
                <p className='font-medium text-lg'>{currency}{totalAmount}.00</p>
            </div>

        </div>
    );
};

export default CartTotal;
