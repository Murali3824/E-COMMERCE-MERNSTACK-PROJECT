import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home'
import Collection from './pages/Collection';
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;