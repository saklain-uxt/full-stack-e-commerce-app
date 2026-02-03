
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">

      <h2 className="text-xl font-semibold mb-4">
        All Products
      </h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 px-4 py-2 rounded-md text-sm font-medium">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      <div className="flex flex-col gap-3 mt-3">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
            items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50 transition"
          >

            {/* Image */}
            <img
              src={item.image[0]}
              alt=""
              className="w-14 h-14 object-cover rounded-md border"
            />

            {/* Name */}
            <p className="font-medium text-gray-800">
              {item.name}
            </p>

            {/* Category */}
            <p className="text-gray-600">
              {item.category}
            </p>

            {/* Price */}
            <p className="font-semibold">
              ₹{item.price}
            </p>

            {/* Action */}
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 font-semibold text-center"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default List
