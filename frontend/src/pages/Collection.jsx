import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, search } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavance');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Sort By');
    
    const sidebarRef = useRef(null);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }

        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const togglesubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }

        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const applyFilter = () => {
        let productsCopy = products.slice();
    
        // Search filter: Check name, category, or description
        if (search) {
            const searchQuery = search.toLowerCase();
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery) // Assuming you have a description field
            );
        }
    
        // Category filter
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }
    
        // Subcategory filter
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }
    
        setFilterProducts(productsCopy);
    };
    

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, products]);

    const sortProducts = (sortOption) => {
        let fpCopy = filterProducts.slice();
        switch (sortOption) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;
            case 'latest':
                setFilterProducts(fpCopy.sort((a, b) => new Date(b.date) - new Date(a.date)));
                break;
            default:
                applyFilter();
                break;
        }
    };

    const handleSort = (sortOption, label) => {
        setSortType(sortOption);
        setSelectedSort(label);
        sortProducts(sortOption);
        setShowSortDropdown(false);
    };

    // Close the sidebar when clicking outside
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setShowFilter(false);
        }
    };

    useEffect(() => {
        if (showFilter) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilter]);

    return (
        <div>
            {/* Banner */}
            <div className='leading-[54px] p-1 flex flex-col justify-center items-center text-center w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] bg-cover bg-center' style={{ backgroundImage: `url(${assets.banner2_img})` }}>
                <p className='text-white text-[45px] md:text-[50px] font-semibold py-2.5'>#stay HOME</p>
                <p className='text-white text-[14px] md:text-[16px] p-1 text-wrap'>Save more money with coupons & up to 70% off!</p>
            </div>

           {/* Mobile Filter and Sort Buttons */}
            <div className="flex justify-between px-4 py-3 bg-white fixed bottom-0 left-0 w-full z-10 md:hidden border-t">
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center justify-center gap-2 text-base font-semibold text-gray-700 rounded-lg p-2 w-1/2 transition hover:bg-gray-100"
                >
                    Filter <img className='w-6' src={assets.filter_icon} alt="Filter" />
                </button>
                <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center justify-center gap-2 text-base font-semibold text-gray-700 rounded-lg p-2 w-1/2 transition hover:bg-gray-100"
                >
                    Sort By <img className='w-6' src={assets.sorting_icon} alt="Sort" />
                </button>
                {/* Sort Dropdown */}
                {showSortDropdown && (
                    <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg z-10 w-1/2">
                        <p onClick={() => handleSort('latest')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'latest' ? 'font-semibold' : ''}`}>Latest</p>
                        <p onClick={() => handleSort('high-low')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'high-low' ? 'font-semibold' : ''}`}>Price: High to Low</p>
                        <p onClick={() => handleSort('low-high')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'low-high' ? 'font-semibold' : ''}`}>Price: Low to High</p>
                    </div>
                )}
            </div>

            {/* Main Layout */}
            <div className='sm:px-[1vw] md:px-[2vw] lg:px-[3vw] flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

                {/* Filter Sidebar (Visible on click for mobile) */}
                {showFilter && (
                    <div className='fixed inset-0 bg-black bg-opacity-20 z-20 '>

                    <div ref={sidebarRef} className={`fixed z-20 bg-white p-4 w-[75%] top-0 left-0 h-full shadow-lg transition-transform transform ${showFilter ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 block md:hidden`}>
                        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                            <img src={assets.cross_icon} className='w-4' alt="" /> Close
                        </p>

                        {/* Category Filter */}
                        <div className='border border-gray-300 pl-5 py-3 mt-6'>
                            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
                                </p>
                            </div>
                        </div>

                        {/* Subcategory Filter */}
                        <div className='border border-gray-300 pl-5 py-3 mt-6 my-5'>
                            <p className='mb-3 text-sm font-medium'>TYPE</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Topwear'} onChange={togglesubCategory} /> Topwear
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={togglesubCategory} /> Bottomwear
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Winterwear'} onChange={togglesubCategory} /> Winterwear
                                </p>
                            </div>
                        </div>

                    </div>
                    
                </div>
                )

                }
                {/* Left-side Filter (Sticky) */}
                <div className='min-w-60 sm:px-0 hidden md:block'>
                    <div className='sticky top-20'>
                        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' >
                            FILTERS
                            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=''/>
                        </p>

                        {/* Category Filter */}
                        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ showFilter ? '' : 'hidden' } sm:block`} >
                            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} />
                                    Men
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} />
                                    Women
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} />
                                    Kids
                                </p>
                            </div>
                        </div>

                        {/* Subcategory Filter */}
                        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${ showFilter ? '' : 'hidden' } sm:block`} >
                            <p className='mb-3 text-sm font-medium'>TYPE</p>
                            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Topwear'} onChange={togglesubCategory} />
                                    Topwear
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={togglesubCategory} />
                                    Bottomwear
                                </p>
                                <p className='flex gap-2'>
                                    <input className='w-3' type='checkbox' value={'Winterwear'} onChange={togglesubCategory} />
                                    Winterwear
                                </p>
                            </div>
                        </div>

                        {/* Sort by */}
                        <div className='hidden md:block'>
                            <div className="flex items-center gap-1.5 relative">
                                <button 
                                    className="text-base font-medium border p-2 rounded-md bg-white" 
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                >
                                    Sort by: {selectedSort}
                                </button>
                                {showSortDropdown && (
                                    <div className="absolute left-0 top-10 z-10 bg-white border rounded-md shadow-lg mt-1 w-full">
                                        <p onClick={() => handleSort('latest', 'Latest')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'latest' ? 'font-semibold' : ''}`}>
                                            Latest
                                        </p>
                                        <p onClick={() => handleSort('high-low', 'Price: High to Low')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'high-low' ? 'font-semibold' : ''}`}>
                                            Price: High to Low
                                        </p>
                                        <p onClick={() => handleSort('low-high', 'Price: Low to High')} className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${sortType === 'low-high' ? 'font-semibold' : ''}`}>
                                            Price: Low to High
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>


                {/* Right side (Product Sort and Collection) */}
                <div className='flex-1 px-2 sm:px-0'>
                    <div className='flex justify-between text-2xl sm:text-3xl mb-4'>
                        <Title text1={'All'} text2={'COLLECTIONS'} />
                        
                    </div>

                    {/* Map Products */}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 gap-y-6'>
                        {filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default Collection;