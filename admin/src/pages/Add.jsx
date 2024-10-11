import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import LoadingOverlay from '../components/LoadingOverlay ';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true); // Start loading

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}});

            if (response.data.success) {
                toast.success('Product added successfully!');
                setName('')
                setDescription('')
                setPrice('')
                setSizes('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)

            } else {
                toast.error(response.data.message || 'Failed to add product.');
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while adding the product.');
        } finally {
            setLoading(false); // Stop loading after request is done
        }
    };

    return (
        <div className="relative">
            {/* Conditionally render the LoadingOverlay */}
            {loading && <LoadingOverlay />}

            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                {/* Image upload section */}
                <div>
                    <p className='mb-2 font-normal'>Upload Image</p>
                    <div className='flex gap-2'>
                        <label htmlFor="image1">
                            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden/>
                        </label>
                        <label htmlFor="image2">
                            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden/>
                        </label>
                        <label htmlFor="image3">
                            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden/>
                        </label>
                        <label htmlFor="image4">
                            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden/>
                        </label>
                    </div>
                </div>

                {/* Product name */}
                <div className='w-full'>
                    <p className='mb-2 font-normal'>Product name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required disabled={loading}/>
                </div>

                {/* Product description */}
                <div className='w-full'>
                    <p className='mb-2 font-normal'>Product description</p>
                    <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required disabled={loading}/>
                </div>

                {/* Category, sub-category, and price */}
                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                    <div>
                        <p className='mb-2 font-normal'>Product category</p>
                        <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2' disabled={loading}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div>
                        <p className='mb-2 font-normal'>Sub category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' disabled={loading}>
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>
                    <div>
                        <p className='mb-2 font-normal'>Product price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' disabled={loading}/>
                    </div>
                </div>

                {/* Sizes selection */}
                <div>
                    <p className='mb-2 font-normal'>Product sizes</p>
                    <div className='flex gap-3'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div key={size} onClick={() => setSizes(prev => prev.includes(size)
                                ? prev.filter(item => item !== size)
                                : [...prev, size]
                            )}>
                                <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer ${loading && 'cursor-not-allowed'}`}>{size}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bestseller checkbox */}
                <div className='flex gap-2 mt-2'>
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" disabled={loading}/>
                    <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
                </div>

                {/* Submit button */}
                <button className={`w-28 mt-4 py-3 bg-[#088178] text-white rounded-[2px] font-medium ${loading && 'opacity-50 cursor-not-allowed'}`} type='submit' disabled={loading}>
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;
