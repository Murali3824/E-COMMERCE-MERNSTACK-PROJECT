import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const SearchBar = ({ isVisible, setVisible }) => {
    const { search, setSearch, products } = useContext(ShopContext); // Ensure products is provided in context
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && search.trim()) {
            navigate(`/shop?search=${encodeURIComponent(search)}`);
            setVisible(false);
            setSuggestions([])
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Generate suggestions based on the actual products data
        if (value.trim()) {
            const filteredSuggestions = products.filter(product => 
                product.name.toLowerCase().includes(value.toLowerCase())
            ).map(product => product.name); // Adjust according to your product structure
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion);
        navigate(`/shop?search=${encodeURIComponent(suggestion)}`);
        setVisible(false);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSuggestions(false);
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, []);

    return (
        <>
            {/* Search Bar */}
            <div ref={sidebarRef} className={`hidden md:flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <div className="flex items-center cursor-pointer px-4">
                    <img className="w-5 h-4" src={assets.search_icon} alt="Search icon" />
                </div>
                <input
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Search for products..."
                    className=" w-full py-2 pl-1 pr-4 text-sm bg-transparent outline-none rounded-r-full"
                />
            </div>

            {/* Suggestions List */}
            {suggestions.length > 0 && (
                <div className="hidden md:block absolute w-[22rem] top-14 z-20 bg-white border border-gray-300 rounded-lg shadow-md mt-2">
                    <ul className="max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li 
                                key={index} 
                                onClick={() => {handleSuggestionClick(suggestion); setSuggestions([])}} 
                                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Small screen search bar overlay */}
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-30 flex items-center justify-center">
                    <div>
                        <div className='p-4 max-w-md sm:min-w-[32rem] bg-white rounded-lg shadow-lg '>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg text-[#088178] font-medium">Search Products</h2>
                                <button onClick={() => setVisible(false)} className="text-black">
                                    <img src={assets.cross_icon} alt="Close" className="w-4" />
                                </button>
                            </div>
                            <div className="flex items-center bg-gray-100 p-2 rounded-full">
                                <input
                                    value={search}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full py-2 text-base bg-transparent outline-none"
                                />
                                <button onClick={() => setVisible(false)} className="text-black">
                                    <img src={assets.search_icon} alt="Search" className="w-6" />
                                </button>
                            </div>
                        </div>
                        {/* Suggestions List for Mobile */}
                        <div>
                            {suggestions.length > 0 && (
                                <div className="absolute z-20 mr-4  sm:min-w-[32rem] bg-white border border-gray-300 rounded-lg shadow-md mt-[5px]">
                                    <ul className="max-h-44 overflow-y-auto">
                                        {suggestions.map((suggestion, index) => (
                                            <li 
                                                key={index} 
                                                onClick={() => {handleSuggestionClick(suggestion); setSuggestions([])}} 
                                                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default SearchBar;
