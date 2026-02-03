
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'

const Add = ({ token }) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("error hai")
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 flex flex-col gap-6"
    >

      {/* Upload Images */}
      <div>
        <p className="font-semibold mb-2">Product Images</p>
        <div className="flex gap-3 flex-wrap">
          {[image1,image2,image3,image4].map((img, i) => (
            <label
              key={i}
              htmlFor={`image${i+1}`}
              className="w-20 h-20 border rounded-lg overflow-hidden cursor-pointer hover:shadow transition"
            >
              <img
                className="w-full h-full object-cover"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                hidden
                type="file"
                id={`image${i+1}`}
                onChange={(e) =>
                  [setImage1,setImage2,setImage3,setImage4][i](e.target.files[0])
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <p className="font-medium mb-1">Product Name</p>
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Description */}
      <div>
        <p className="font-medium mb-1">Product Description</p>
        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          rows="4"
          placeholder="Write product description"
          required
        />
      </div>

      {/* Category / Price */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="font-medium mb-1">Category</p>
          <select
            onChange={(e)=>setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="font-medium mb-1">Sub Category</p>
          <select
            onChange={(e)=>setSubCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <p className="font-medium mb-1">Price</p>
          <input
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="px-3 py-2 border rounded-md w-32"
            type="number"
            placeholder="₹25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S","M","L","XL","XXL"].map(size => (
            <div
              key={size}
              onClick={()=>setSizes(prev =>
                prev.includes(size)
                  ? prev.filter(i => i !== size)
                  : [...prev, size]
              )}
              className={`px-4 py-1 rounded-full cursor-pointer border text-sm transition
                ${sizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={()=>setBestseller(prev => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="self-start bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
      >
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Add
