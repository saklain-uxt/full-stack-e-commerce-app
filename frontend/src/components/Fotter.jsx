import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Fotter = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
            <img src={assets.logo1} className='mb-5 w-32' alt=""/>
            <p className='w-full md:w-2/3 text-grey-600 '>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, quibusdam repellendus unde molestiae dolorum fuga porro obcaecati in 
            </p>
            </div>
            <div>
                  <p className='text-xl font-medium mb-5'>COMAPNY </p>
                  <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                         <li>About</li>
                          <li>Delivery</li>
                          <li>Policy</li>

                  </ul>
            </div>
            <div>
                  <p className='text-xl font-medium mb-5'>Get in touch</p>
                  <ul className='flex flex-col gap-1 text-gray-600' >
                        <li>+1 434-5535-3355</li>
                        <li>contact-onecart@gmail.com</li>

                  </ul>
            </div>


      </div>
      <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025@ oneCar.com --All Righr Reserved</p>
            
      </div>
      
    </div>
  )
}

export default Fotter
