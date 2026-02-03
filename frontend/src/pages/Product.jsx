import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext} from 'react';
import { ShopContext } from '../context/ShopeContext';
import { useState,useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';




const Product = () => {
  const {productId}=useParams();
  // console.log(productId)
 
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

   const fetchProductData=async ()=>{
      products.map((item)=>{
        if(item._id==productId){
          setProductData(item)
          setImage(item.image[0])
           console.log(item);
          return null;
        }
      })
   }
   

   useEffect(()=>{
    fetchProductData();
   },[productId,products])



  return  productData ? (

         <div className='border-t-2 pt-10 transition-opacity   ease-in duration-500 opacity-100'>
          {/*----------- Product Data-------------- */}

          <div className="flex gap-6 sm:gap-12 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex-col sm:flex-row shadow-sm">

  {/*---------- Product Images------------- */}
  <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">

    {/* Thumbnails */}
    <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible justify-between sm:justify-start sm:w-[18.7%] w-full gap-2">
      {productData.image.map((item, index) => (
        <img
          key={index}
          onClick={() => setImage(item)}
          src={item}
          className={`w-[22%] sm:w-full rounded-lg cursor-pointer border transition-all duration-300
            ${item === image 
              ? 'border-black scale-[1.02]' 
              : 'border-transparent hover:border-gray-300 hover:scale-[1.02]'
            }`}
          alt=""
        />
      ))}
    </div>

    {/* Main Image */}
    <div className="w-full sm:w-[80%] overflow-hidden rounded-xl border border-gray-100">
      <img
        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        src={image}
        alt=""
      />
    </div>

  </div>

  {/* -------- Product Info ---------- */}
  <div className="flex-1 flex flex-col">

    <h1 className="font-semibold text-2xl sm:text-3xl mt-2 text-gray-900">
      {productData.name}
    </h1>

    {/* Rating */}
    <div className="flex items-center gap-1 mt-3">
      <img src={assets.star_icon} className="w-3.5" />
      <img src={assets.star_icon} className="w-3.5" />
      <img src={assets.star_icon} className="w-3.5" />
      <img src={assets.star_icon} className="w-3.5" />
      <img src={assets.star_dull_icon} className="w-3.5" />
      <p className="pl-2 text-sm text-gray-500">(122 reviews)</p>
    </div>

    {/* Price */}
    <p className="mt-5 text-3xl font-semibold text-gray-900">
      {currency}{productData.price}
    </p>

    {/* Description */}
    <p className="mt-4 text-gray-600 leading-relaxed md:w-4/5">
      {productData.description}
    </p>

    {/* Size Selector */}
    <div className="flex flex-col gap-3 my-8">
      <p className="text-sm font-medium text-gray-700">Select Size</p>
      <div className="flex gap-3 flex-wrap">
        {productData.sizes.map((item, index) => (
          <button
            key={index}
            onClick={() => setSize(item)}
            className={`border px-4 py-2 rounded-md text-sm transition-all duration-300
              ${item === size
                ? 'border-black bg-black text-white scale-105'
                : 'border-gray-300 bg-white hover:border-black hover:scale-105'
              }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Add to cart */}
    <button
      onClick={() => addToCart(productData._id, size)}
      className="bg-black text-white px-10 py-3 text-sm rounded-md w-fit
                 transition-all duration-300 hover:bg-gray-800 active:scale-95"
    >
      ADD TO CART
    </button>

    <hr className="mt-8 sm:w-4/5 border-gray-200" />

    {/* Policies */}
    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
      <p>✔ 100% Original product</p>
      <p>✔ Cash on delivery available</p>
      <p>✔ Easy return & exchange within 7 days</p>
    </div>

  </div>
</div>

    
    {/* ---------- Description & Review Section ------------- */}

    {/* ---------- Description & Review Section ------------- */}
<div className="mt-20">

  {/* Tabs */}
  <div className="flex border-b border-gray-200">
    <button
      className="px-6 py-3 text-sm font-medium text-black border-b-2 border-black
                 transition-colors duration-300"
    >
      Description
    </button>

    <button
      className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-black
                 transition-colors duration-300"
    >
      Reviews (122)
    </button>
  </div>

  {/* Content */}
  <div className="border border-t-0 px-6 sm:px-8 py-6 sm:py-8
                  text-sm text-gray-600 leading-relaxed rounded-b-xl">

    <p>
      An e-commerce website is an online platform that facilitates the buying
      and selling of products or services over the internet. It serves as a
      virtual marketplace where businesses and individuals can showcase their
      products, interact with customers, and conduct transactions without the
      need for a physical presence.
    </p>

    <p className="mt-4">
      E-commerce websites typically display products or services along with
      detailed descriptions, images, prices, and any available variations
      such as sizes or colors. Each product usually has its own dedicated
      page with relevant information.
    </p>

  </div>
</div>

 {/* --------- display related products ---------- */}

     <RelatedProducts  category={productData.category} subCategory={productData.subCategory} />


      


          
    </div>


    
  ): <div className='opacity-0'></div>
}

export default Product
