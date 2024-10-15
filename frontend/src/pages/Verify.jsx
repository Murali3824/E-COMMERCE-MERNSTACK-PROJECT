import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true); // Add loading state

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setCartItems({});
                navigate('/orders')
            } else {
                toast.error(response.data.message);
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while verifying payment.');
            navigate('/cart'); // Redirect to cart on error
        } finally {
            setLoading(false); // Set loading to false after verification
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div className='mt-20 text-3xl font-normal px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] w-full flex justify-center'>
            {loading ? 'Verifying...' : 'Verification Complete!'}
        </div>
    );
};

export default Verify;
