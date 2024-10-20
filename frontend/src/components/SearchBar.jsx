import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const SearchBar = ({ isVisible, setVisible }) => {
    const { search, setSearch } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && search.trim()) {
            navigate(`/shop?search=${encodeURIComponent(search)}`);
            setVisible(false); // Close the search bar on search
        }
    };

    return (
        <>
            {/* Desktop search bar */}
            <div className={`hidden md:flex items-center md:w-[200px] lg:w-full bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300`}>
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

            {/* Small screen search bar overlay */}
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-30 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg text-[#088178] font-medium">Search Products</h2>
                            <button onClick={() => setVisible(false)} className="text-black">
                                <img src={assets.cross_icon} alt="Close" className="w-4" />
                            </button>
                        </div>
                        <div className="flex items-center bg-gray-100 p-2 px-4 rounded-full">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Search for products..."
                                className="w-full py-2  text-base bg-transparent outline-none"
                            />
                            <button onClick={() => setVisible(false)} className="text-black">
                                <img src={assets.search_icon} alt="Search" className="w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;
