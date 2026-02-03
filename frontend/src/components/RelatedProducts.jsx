
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext';
import Title from './Title';
import ProductItems from './ProductItems';
import { motion } from "framer-motion";

const RelatedProducts = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  const ITEMS_PER_PAGE = 5; // visible items
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(item => category === item.category);
      productsCopy = productsCopy.filter(item => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 10));
      setStartIndex(0);
    }
  }, [products, category, subCategory]);

  // 🔹 CIRCULAR VISIBLE ITEMS
  const visibleProducts =
    related.length > 0
      ? Array.from({ length: ITEMS_PER_PAGE }, (_, i) =>
          related[(startIndex + i) % related.length]
        )
      : [];

  // 🔹 MOVE BY HALF LENGTH (STEP)
  const STEP = ITEMS_PER_PAGE;

  const handleNext = () => {
    setStartIndex(prev =>
      (prev + STEP) % related.length
    );
  };

  const handleBack = () => {
    setStartIndex(prev =>
      (prev - STEP + related.length) % related.length
    );
  };

  return (
    <div className="my-24">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-3xl py-2"
      >
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 border rounded-md hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 border rounded-md hover:bg-black hover:text-white transition"
        >
          Next →
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8">
        {visibleProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

    </div>
  );
};

export default RelatedProducts;




