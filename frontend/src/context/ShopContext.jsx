import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Product from "../pages/Product";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        const cartData = structuredClone(cartItems);
    
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
                    
                }
            }
        }
        return totalCount;
    }
    useEffect(() => {
        console.log(cartItems);
    },[cartItems])

    const updateQuantity = async (itemId,size,quantity) => {
        
        let cartData =structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product)=>product._id === items);
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


    const contextValue = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,
        navigate,
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;