
import React, { useContext, useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShopContext } from '../context/ShopeContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext)
 const [orderData,setorderData]=useState([])

  
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      console.log(response)
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])




  return (
    <div className="border-t pt-16 px-4 md:px-16 lg:px-32">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-10"
      >
        <Title text1="My" text2="Orders" />
      </motion.div>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        {orderData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border p-5
            flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            {/* Left: Product Info */}
            <div className="flex gap-5">
              <img
                className="w-20 h-24 object-cover rounded-lg border"
                src={item.image[0]}
                alt={item.name}
              />

              <div className="flex flex-col gap-1 text-sm">
                <p className="font-semibold text-gray-800 text-base">
                  {item.name}
                </p>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="text-gray-500">
                  Date:{' '}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>

                <p className="text-gray-500">
                  Payment:{' '}
                  <span className="text-gray-400">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Status + Action */}
            <div className="flex md:flex-col items-start md:items-end justify-between gap-4 md:min-w-[180px]">
              
              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    item.status === 'Delivered'
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`}
                />
                <p className="text-sm font-medium text-gray-700">
                  {item.status}
                </p>
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-800 px-4 py-2 text-sm
                rounded-md hover:bg-gray-800 hover:text-white
                transition-all duration-300"
                onClick={loadOrderData} 
              >
                Track Order
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Orders


