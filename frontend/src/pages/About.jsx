import React from 'react'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const About = () => {
  return (
    <div className="w-full">

      {/* 🔹 ABOUT TITLE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl text-center pt-10 border-t"
      >
        <Title text1="ABOUT" text2="US" />
      </motion.div>

      {/* 🔹 ABOUT SECTION */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-16 px-4 md:px-16 lg:px-32">

        {/* Image */}
        <motion.img
          src={assets.about_img}
          alt="About"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:max-w-[450px] rounded-xl shadow-lg"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 md:w-2/4 text-gray-600 leading-relaxed"
        >
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to make online shopping effortless and enjoyable.
          </p>

          <p>
            Since our inception, we've curated a diverse collection of
            high-quality products — from fashion and beauty to electronics and
            home essentials — sourced from trusted brands.
          </p>

          <div>
            <p className="font-semibold text-gray-800 text-lg mb-1">
              Our Mission
            </p>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence by delivering a seamless shopping
              experience.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 🔹 WHY CHOOSE US */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl py-6 text-center"
      >
        <Title text1="WHY" text2="CHOOSE US" />
      </motion.div>

      {/* 🔹 FEATURE CARDS */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-16 lg:px-32 mb-20">

        {[
          {
            title: 'Quality Assurance',
            desc: 'We carefully select and vet every product to ensure the highest quality standards.'
          },
          {
            title: 'Convenience',
            desc: 'A user-friendly interface and hassle-free ordering make shopping effortless.'
          },
          {
            title: 'Exceptional Support',
            desc: 'Our dedicated support team is always ready to assist you.'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="flex-1 border rounded-xl px-8 py-10 bg-white shadow-sm
            hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-semibold text-gray-800 mb-3">
              {item.title}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🔹 NEWSLETTER */}
      <Newsletterbox />
    </div>
  )
}

export default About

