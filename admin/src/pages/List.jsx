import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

    const [list,setList] = useState([])

    const fetchList = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list');
            // console.log(response.data);
            if ((response.data.products)) {
                setList(response.data.products.reverse())
            } 
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const removeProduct = async (id) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token}});
            if (response.data.success) {
                toast.success('Product removed!');
                await fetchList();
            } else {
                toast.error(response.data.message || 'Failed to remove product.');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchList()
    },[])

    return (
        <>
            <p className='mb-4 font-semibold text-2xl text-center'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* list titles  */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>
                {/* list products  */}
                {
                    list.map((item,index) => (
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border text-sm' key={index}>
                            <img className='w-16  object-cover rounded-lg' src={item.image[0]} alt="" />
                            <p className='mt-2 sm:mt-0 truncate font-medium text-gray-800'>{item.name}</p>
                            <p className='hidden md:block text-gray-600 font-medium'>{item.category}</p>
                            <p className='hidden md:block font-semibold text-gray-800'>{currency}{item.price}</p>
                            <p onClick={()=>removeProduct(item._id)} className='hidden md:block text-red-500 text-right sm:text-center cursor-pointer text-lg hover:underline transition duration-200'>Remove</p>
                            <div className='md:hidden flex items-center justify-between mt-2'>
                                <div>
                                    <p className=' text-gray-600 font-medium'>{item.category}</p>
                                    <p className='font-semibold text-gray-800'>{currency}{item.price}</p>
                                </div>
                                <p onClick={()=>removeProduct(item._id)} className='text-red-500 text-center cursor-pointer text-lg hover:underline transition duration-200'>Remove</p>
                            </div>
                        </div>
                        
                    ))
                }
            </div>
        </>
    );
};

export default List;