import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup.jsx';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify.jsx';
import MyProfile from './pages/Myprofile.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"  
        autoClose={2000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}  
        rtl={false}
        pauseOnFocusLoss={true}  
        draggable={true}  
        pauseOnHover={true}  
        toastClassName="bg-gray-800 text-white font-semibold rounded-lg shadow-lg max-w-[80%] sm:max-w-[400px] mx-auto my-2" 
        bodyClassName="text-sm p-3"  
      />

      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/loginsignup' element={<LoginSignup />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;