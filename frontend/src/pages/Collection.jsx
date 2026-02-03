import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopeContext'
import { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import ProductItems from '../components/ProductItems';



import Title from '../components/Title';


 
const Collection = () => {
  const {products,showSearch,search} =useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')
  


  
   




  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

    const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }



    

       const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  //  const sortProduct = () => {

  //   let fpCopy = filterProducts.slice();

  //   switch (sortType) {
  //     case 'low-high':
  //       setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
  //       break;

  //     case 'high-low':
  //       setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
  //       break;

  //     default:
  //       applyFilter();
  //       break;
  //   }

  // }

  const sortProduct = () => {
  if (!sortType) {
    applyFilter();
    return;
  }

  const sortedProducts = [...filterProducts].sort((a, b) => {
    if (sortType === "low-high") return a.price - b.price;
    if (sortType === "high-low") return b.price - a.price;
    return 0;
  });

  setFilterProducts(sortedProducts);
};


 

     
  

      useEffect(()=>{
    applyFilter();

  },[category,subCategory,search,showSearch,products])

   useEffect(()=>{
    sortProduct();
  },[sortType])
   
   
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>
      {/*  Filter option */}

      <div className="min-w-60 bg-white border border-gray-200 rounded-lg p-4">

  {/* Filter Header */}
  <div
    onClick={() => setShowFilter(!showFilter)}
    className="flex items-center justify-between cursor-pointer"
  >
    <p className="text-base font-semibold text-gray-800">
      Filters
    </p>

    <img
      src={assets.dropdown_icon}
      alt=""
      className={`h-3 sm:hidden transition-transform duration-300 ${
        showFilter ? "rotate-90" : ""
      }`}
    />
  </div>

  {/* Category Filter */}
  <div className={`mt-5 ${showFilter ? "" : "hidden"} sm:block`}>
    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
      Categories
    </p>

    <div className="flex flex-col gap-3 text-sm text-gray-700">
      {["Men", "Women", "Kids"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-3 cursor-pointer hover:text-black transition"
        >
          <input
            type="checkbox"
            onChange={toggleCategory}

            value={item}
            className="
              w-4 h-4 
              rounded 
              border-gray-300 
              text-black 
              focus:ring-black
            "
          />
          {item}
        </label>
      ))}
    </div>
  </div>

  {/* Divider */}
  <div className="my-5 border-t border-gray-200" />

  {/* Sub Category */}
  <div className={`${showFilter ? "" : "hidden"} sm:block`}>
    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
      Type
    </p>

    <div className="flex flex-col gap-3 text-sm text-gray-700">
      {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-3 cursor-pointer hover:text-black transition"
        >
          <input
            type="checkbox"
            onChange={ toggleSubCategory}
            value={item}
            className="
              w-4 h-4 
              rounded 
              border-gray-300 
              text-black 
              focus:ring-black
            "
          />
          {item}
        </label>
      ))}
    </div>
  </div>
</div>


      
     

          {/* Right Side */}
          <div className="flex-1">
  <div className="flex items-center justify-between mb-6">
    
    {/* Title */}
    <div className="text-white">
      <Title text1={'ALL'} text2={'Collection'} />
      <p className="text-sm text-gray-400 mt-1">
        Browse and manage your product collections
      </p>
    </div>

    {/* Product Sort */}
    <select
      className="
        bg-[#0f172a] text-gray-200 text-sm px-4 py-2 rounded-lg border  border-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500 
        hover:border-gray-500
        transition
      "
      onChange={(e)=>setSortType(e.target.value)}
    >
      <option className="bg-[#0f172a]"  value="relevant">
        Sort by: Relevant
      </option>
      <option className="bg-[#0f172a]"  value="low-high">
        Sort by: Low to High
      </option>
      <option className="bg-[#0f172a]"  value="high-low">
        Sort by: High to Low
      </option>
    </select>
  </div>


  {/*Map product */}
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

      {
            filterProducts.map((item,index)=>(
               <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image} />

               
            ))

        

          }

        
         
        </div>


</div>

        
    </div>
  )
}

export default Collection
