


import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="pt-14 px-4 sm:px-8">

      {/* Page Title */}
      <div className="text-2xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* MAIN CARD */}
      <div
        className="
          max-w-6xl mx-auto
          bg-zinc-900/60
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-4 sm:p-8
          shadow-lg
        "
      >
        <div className="flex flex-col gap-6">

          {/* CART ITEMS */}
          {cartData.map((item, index) => {
            const productData = products.find(
              product => product._id === item._id
            )

            return (
              <div
                key={index}
                className="
                  py-4
                  grid grid-cols-[4fr_0.5fr_0.5fr]
                  sm:grid-cols-[4fr_2fr_0.5fr]
                  items-center gap-4
                  bg-zinc-800/70
                  border border-white/10
                  rounded-xl
                  px-4
                "
              >
                {/* PRODUCT INFO */}
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20 rounded-lg border border-white/10"
                    src={productData.image[0]}
                    alt=""
                  />

                  <div>
                    <p className="text-xs sm:text-lg font-medium text-white">
                      {productData.name}
                    </p>

                    <div className="flex items-center gap-5 mt-2 text-sm text-zinc-300">
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border border-white/20 bg-zinc-700/60">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QUANTITY INPUT (UNCHANGED) */}
                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="
                    border border-white/20
                    bg-zinc-800 text-white
                    max-w-10 sm:max-w-20
                    px-1 sm:px-2 py-1
                    text-center
                    outline-none
                  "
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />

                {/* DELETE ICON — EXACT SAME AS ORIGINAL */}
                <img
  onClick={() => updateQuantity(item._id, item.size, 0)}
  className="
    w-4 mr-4 sm:w-5 cursor-pointer
    filter brightness-0 saturate-100
    hover:scale-110 transition
  "
  style={{
    filter:
      'invert(18%) sepia(94%) saturate(7485%) hue-rotate(357deg) brightness(95%) contrast(120%)'
  }}
  src={assets.bin_icon}
  alt="Delete"
/>

                
              </div>
            )
          })}

          {/* CART TOTAL + BUTTON */}
          <div className="flex flex-col items-end mt-10">
            <div className="w-full sm:w-[420px]">
              <CartTotal />
              <div className="text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="
                    bg-white text-black
                    text-sm font-semibold
                    my-8 px-8 py-3
                    rounded-xl
                    hover:scale-[1.02]
                    transition
                  "
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart
