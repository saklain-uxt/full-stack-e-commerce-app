
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from './Title'
import { motion, AnimatePresence } from 'framer-motion'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="
      w-full rounded-2xl p-6
      bg-white dark:bg-zinc-900
      border border-gray-200 dark:border-zinc-700
      shadow-sm
      transition-colors duration-300
    ">
      
      {/* Title */}
      <div className="mb-6">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Price Details */}
      <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-zinc-400">

        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Subtotal</p>

          <AnimatePresence mode="wait">
            <motion.p
              key={subtotal}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="font-semibold text-gray-900 dark:text-white"
            >
              {currency} {subtotal}.00
            </motion.p>
          </AnimatePresence>
        </div>

        <hr className="border-gray-200 dark:border-zinc-700" />

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Shipping Fee</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {currency} {delivery_fee}.00
          </p>
        </div>

        <hr className="border-gray-200 dark:border-zinc-700" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900 dark:text-white">
            Total
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={total}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="font-bold text-lg text-black dark:text-white"
            >
              {currency} {total}.00
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

export default CartTotal


