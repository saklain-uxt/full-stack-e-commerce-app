
import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)
  const [liked, setLiked] = useState(false)

  return (
    <Link
      to={`/product/${id}`}
      className="group block text-gray-700 relative"
    >
      {/* Image Wrapper */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]">

        {/* Product Image */}
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/*  Like Button (INSIDE wrapper) */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className="
            absolute top-3 right-3 z-20
            bg-white p-2 rounded-full shadow-md
            opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <Heart
            size={18}
            className={
              liked
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600'
            }
          />
        </button>

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="pt-3">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItems


