


import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 overflow-hidden">
      
      {/* Left Section */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
      >
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Our BestSeller</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrival
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-demibold text-sm md:text-base">Shop now</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.img
        src={assets.hero2_img}
        alt="Hero Image"
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        className="w-full sm:w-1/2 object-cover"
      />
      
    </div>
  )
}

export default Hero




