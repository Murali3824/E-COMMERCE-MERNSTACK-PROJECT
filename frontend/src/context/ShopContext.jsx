import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    // backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')

    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }
    
        const cartData = structuredClone(cartItems || {});
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);
        // Displaying success toast notification
        toast.success('Added to cart!');

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        } 
        // else {
        //     toast.warning('You are not logged in');
        // }

    };
    
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }
    useEffect(() => {
        // Logging cart items for debug purposes
        // console.log(cartItems);
    },[cartItems])

    const updateQuantity = async (itemId,size,quantity) => {
        
        let cartData =structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity}, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product)=>product._id === items);
            if (!itemInfo) continue; // Skip if itemInfo is not found
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log("get ammount error");
                }
            }
        }
        return totalAmount;
    }

    // geting user cart details on reloading from backend
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            // console.log("User cart response:", response.data);
            
            if (response.data.success) {
                setCartItems(response.data.cartData); // Update this line
            } else {
                toast.error('Failed to fetch cart data');
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            toast.error(error.message);
        }
    };

    // getting product data from backend admin
    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getProductsData()
    },[])

    // Effect to manage user authentication and cart data on page reload
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))  // Retrieve the token from localStorage and set it in the state
            getUserCart(localStorage.getItem('token'))  // Fetch the user's cart data using token
        }
    },[token])


    useEffect(() => {
        if (token) {
            getUserCart(token);
        } else {
            setCartItems({}); // Clear cart items if no token
        }
    }, [token]);
    
    const contextValue = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,
        navigate,
        backendUrl,
        setToken,token,
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;