
import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from './Title'
import ProductItems from './ProductItems'
import { motion, useAnimation, useInView } from 'framer-motion'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="my-10"
    >
      {/* Title */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center py-8 text-3xl"
      >
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </motion.div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((items, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <ProductItems
              id={items._id}
              image={items.image}
              name={items.name}
              price={items.price}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default LatestCollection


