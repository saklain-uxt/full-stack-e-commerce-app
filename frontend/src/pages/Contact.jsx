
import React from 'react'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="w-full">

      {/* 🔹 Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-2xl pt-10 border-t"
      >
        <Title text1="CONTACT" text2="US" />
      </motion.div>

      {/* 🔹 Main Content */}
      <div className="my-14 flex flex-col md:flex-row items-center justify-center gap-14 px-4 md:px-16 lg:px-32 mb-28">

        {/* Image */}
        <motion.img
          src={assets.contact_img}
          alt="Contact"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:max-w-[480px] rounded-xl shadow-lg"
        />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 max-w-md"
        >
          <div>
            <p className="font-semibold text-xl text-gray-800 mb-1">
              Our Store
            </p>
            <p className="text-gray-600 leading-relaxed">
              54709 Williams street-290 <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed">
              Tel: (415) 555-0132 <br />
              Email: admin@forever.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-800 mb-1">
              Careers at Forever
            </p>
            <p className="text-gray-600 leading-relaxed">
              Learn more about our teams and current job openings.
            </p>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit border border-gray-900 px-8 py-3 text-sm
            hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  )
}

export default Contact

