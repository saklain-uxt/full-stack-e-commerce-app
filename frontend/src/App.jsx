import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Collection from './pages/Collection.jsx'
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Product from './pages/Product.jsx'
import Navbar from './components/Navbar.jsx'
import Fotter from './components/Fotter.jsx'
import Verify from './pages/Verify.jsx'
import SearchBar from './components/SearchBar.jsx'
import  { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
       <Toaster />
      <Navbar />
      <SearchBar />
       
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Fotter />
     
      
    </div>
  )
}

export default App

