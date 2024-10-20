import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const SearchBar = () => {
    const { search, setSearch } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && search.trim()) {
            navigate(`/shop?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div className="hidden md:flex items-center md:w-[200px] lg:w-full  bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center px-4">
                <img className="w-5 h-4" src={assets.search_icon} alt="Search icon" />
            </div>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-1 pr-4 text-sm bg-transparent outline-none rounded-r-full"
            />
        </div>
    );
};

export default SearchBar;
