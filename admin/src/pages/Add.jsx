import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import LoadingOverlay from '../components/LoadingOverlay';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            [image1, image2, image3, image4].forEach((image, index) => {
                if (image) {
                    formData.append(`image${index + 1}`, image);
                }
            });

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });
            if (response.data.success) {
                toast.success("Product added successfully!");
                resetForm();
            } else {
                toast.error(response.data.message || "Failed to add product.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding the product.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
    };

    const renderImageUpload = (image, setImage, id) => (
        <label htmlFor={id} className="w-24 h-24 bg-gray-100 border border-dashed rounded flex items-center justify-center cursor-pointer">
            {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover rounded" />
            ) : (
                <span className="text-gray-400">Upload</span>
            )}
            <input type="file" id={id} hidden onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
        </label>
    );

    return (
        <div className="sm:p-6 flex flex-col md:items-center bg-gray-50 min-h-screen">
            {loading && <LoadingOverlay />}
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Image upload section */}
                <div>
                    <p className='mb-4 font-semibold text-xl'>Upload Image</p>
                    <div className='flex gap-2'>
                        <label htmlFor="image1">
                            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                        </label>
                        <label htmlFor="image2">
                            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                        </label>
                        <label htmlFor="image3">
                            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                        </label>
                        <label htmlFor="image4">
                            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded"
                            placeholder="Enter product name"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded"
                            placeholder="Enter price"
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded"
                        placeholder="Enter product description"
                        rows={4}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded"
                            disabled={loading}
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded"
                            disabled={loading}
                        >
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Sizes</label>
                    <div className="flex items-center gap-2 mt-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() =>
                                    setSizes((prev) =>
                                        prev.includes(size)
                                            ? prev.filter((s) => s !== size)
                                            : [...prev, size]
                                    )
                                }
                                className={`px-4 py-2 border rounded ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-100"
                                    }`}
                                disabled={loading}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="bestseller"
                        checked={bestseller}
                        onChange={() => setBestseller((prev) => !prev)}
                        disabled={loading}
                    />
                    <label htmlFor="bestseller" className="text-sm text-gray-700">Mark as Bestseller</label>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 text-white rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default Add;
