
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';


const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible]=useState(false);
  const location=useLocation();

  useEffect(()=>{
      // console.log(location)
     if(location.pathname.includes('collection')){
      setVisible(true)
     }else{
      setVisible(false)
     }


  },[location])

    

   

    return showSearch  && visible ? (
  <div className="border-t border-b bg-gray-50 text-center">
    <div
      className="
        inline-flex items-center justify-center
        border border-gray-300
        px-5 py-2 my-5 mx-3
        rounded-full
        w-3/4 sm:w-1/2
        bg-white
        focus-within:border-black
        focus-within:ring-1
        focus-within:ring-black
        transition
      "
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          flex-1
          outline-none
          bg-transparent
          text-sm
          text-gray-700
          placeholder-gray-400
        "
        type="text"
        placeholder="Search"
      />

      <img
        className="w-4 opacity-70"
        src={assets.search_icon}
        alt=""
      />
    </div>

    <img
      onClick={() => setShowSearch(false)}
      className="
        inline w-3
        cursor-pointer
        opacity-60
        hover:opacity-100
        transition
      "
      src={assets.cross_icon}
      alt=""
    />
  </div>
) : null

    
 
}

export default SearchBar

