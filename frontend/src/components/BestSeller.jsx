import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import { useContext } from 'react';
import Title from './Title'
import ProductItems from './ProductItems';

const BestSeller = () => {

        const {products}=useContext(ShopContext);

      const [bestSeller,setBestSeller]=useState([]);
      useEffect(()=>{
            const bestProduct=products.filter((item)=>(item.bestseller));
            setBestSeller(bestProduct.slice(0,5))


       },[products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'Seller'}/>
            <p className='w-3/4 m-auto text xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolor laboriosam nulla minima ex, repellendus vero doloribus dolorem fugiat molestiae inventore porro culpa quibusdam, corporis ipsa recusandae et enim labore!</p>

      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid md:grid-cols lg:grid-cols-5 gap-4 gap-y-6'>
            {
                  bestSeller.map((item,index)=>(
                        <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                        
                  ))
            }

      </div>
      
    </div>
  )
}

export default BestSeller
