


import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useLocation,Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShopContext } from "../context/ShopeContext";


const links = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const pillRef = useRef(null);
  const itemRefs = useRef([]);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);
   
   const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  useEffect(() => {
    const index = links.findIndex(
      (link) => link.path === location.pathname
    );
    const activeItem = itemRefs.current[index];
    if (!activeItem) return;

    gsap.to(pillRef.current, {
      x: activeItem.offsetLeft,
      width: activeItem.offsetWidth,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [location.pathname]);

  return (
    <div className="flex items-center  justify-between py-5 px-6 bg-slate-50  font-medium">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to='/'>
         <img src={assets.logo1} className="w-36" alt="" />
         </Link>
       
        <h1 className="text-2xl font-bold">one cart</h1>
       
      </div>

      {/* Capsule Nav */}
      <div className="hidden sm:block">
        <div className="relative border border-gray-400 rounded-full px-2 py-1">
          <ul className="flex gap-1 text-sm text-gray-700 relative">
            {links.map((link, i) => (
              <NavLink
                key={link.name}
                to={link.path}
                ref={(el) => (itemRefs.current[i] = el)}
                className="relative z-10 px-5 py-2 rounded-full transition-colors
                           hover:text-black"
              >
                {link.name}
              </NavLink>
            ))}

            {/* Active sliding pill */}
            <span
              ref={pillRef}
              className="absolute top-0 left-0 h-full bg-gray-200 rounded-full z-0"
              style={{ width: 0 }}
            />
          </ul>
          
        </div>
       
      </div>
         {/* Profile and Search Icons */}
         <div className="flex items-center gap-6">


 <Link to={'/collection'}>
  <img src={assets.search_icon} onClick={()=>setShowSearch(true)}className="w-5" alt="" />
 </Link>
 


  <div
    className="relative"
    onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)}
  >
    <Link to={'/login'}>
    <img onClick={()=>token ? null : navigate('/login')}
      src={assets.profile_icon}
      className="w-5 cursor-pointer"
      alt=""
    />
    </Link>
    

    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-0 pt-4"
        >
          {token && <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded-full shadow-md">
            <p className="cursor-pointer hover:text-black">My profile</p>
            <p onClick={()=>navigate('/order')} className="cursor-pointer hover:text-black">Order</p>
            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
          </div>
          }
        </motion.div>
      )}
    </AnimatePresence>
  </div>
           <Link to="/cart" className="relative">
           <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
           <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>


           </Link>
           <img 
           onClick={()=>setVisible(true)}
            src={assets.menu_icon} className="w-6 sm:hidden cursor-pointer" alt=""
            />
      
</div>
       {/* Mobile Menu Overlay */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
          <div className="flex flex-col text-gray-600">
            <div onClick={()=>setVisible(false)} className="flex justify-end p-4 gap-4 cursor-pointer " >
              <img src={assets.dropdown_icon} className="h-4 rotate-180"/>
              <p>Back</p>
            
            </div>
            <NavLink className="py-2 pl-6 border" onClick={() => setVisible(false)} to='/'>Home</NavLink>
            <NavLink className="py-2 pl-6 border"  onClick={() => setVisible(false)} to='/collection'>Collection</NavLink>
            <NavLink className="py-2 pl-6 border"  onClick={() => setVisible(false)} to='/about'>About</NavLink>
            <NavLink className="py-2 pl-6 border"  onClick={() => setVisible(false)} to='/contact'>Contact</NavLink>  
            

          </div>

          </div>
       
        

         
    </div>
  );
};

export default Navbar;



