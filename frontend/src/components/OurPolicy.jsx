import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className=' flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Exchange policies</p>
            <p className='text-grey-400'>we offer hassle free exchane policy</p>
      </div>
       <div>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Exchange policies</p>
            <p className='text-grey-400'>we offer hassle free exchane policy</p>
      </div>
       <div>
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Exchange policies</p>
            <p className='text-grey-400'>we offer hassle free exchane policy</p>
      </div>

      
    </div>
  )
}

export default OurPolicy
