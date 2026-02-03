
import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopeContext'
import axios from 'axios' 
import toast from 'react-hot-toast'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate,backendUrl, token,cartItems,setCartItems,getCartAmount,delivery_fee,products, } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }


      
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

  const onSubmitHandler = async (e) => {

    e.preventDefault()
    try{

        let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            console.log(orderItems)

                let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            console.log(orderData)


            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    console.log(response)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;


                    case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    console.log(responseStripe)
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                     case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                     initPay(responseRazorpay.data.order)
                       
                    }
                    break;
                    


                    
                    default:
                      break;

                
            }
           

    }catch(e){
      console.log(e)
    }
    




  }
  //console.log(formData)

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col lg:flex-row gap-8 pt-8 sm:pt-14 min-h-[80vh] border-t'
    >

      {/* -------- LEFT : DELIVERY INFO -------- */}
      <div className='w-full lg:max-w-[500px] bg-white rounded-xl shadow-md p-6 animate-fadeIn'>
        <div className='text-xl sm:text-2xl mb-6'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='First name' />
          <input required name='lastName' value={formData.lastName}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='Last name' />
        </div>

        <input required name='email' value={formData.email}
          onChange={onChangeHandler}
          className='input-ui mt-3'
          type="email"
          placeholder='Email address' />

        <input required name='street' value={formData.street}
          onChange={onChangeHandler}
          className='input-ui mt-3'
          placeholder='Street' />

        <div className='flex gap-3 mt-3'>
          <input required name='city' value={formData.city}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='City' />
          <input name='state' value={formData.state}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='State' />
        </div>

        <div className='flex gap-3 mt-3'>
          <input required name='zipcode' value={formData.zipcode}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='Zipcode' />
          <input required name='country' value={formData.country}
            onChange={onChangeHandler}
            className='input-ui'
            placeholder='Country' />
        </div>

        <input required name='phone' value={formData.phone}
          onChange={onChangeHandler}
          className='input-ui mt-3'
          placeholder='Phone' />
      </div>

      {/* -------- RIGHT : PAYMENT -------- */}
      <div className='flex-1 space-y-8 animate-slideUp'>

        <div className='bg-white rounded-xl shadow-md p-6'>
          <CartTotal />
        </div>

        <div className='bg-white rounded-xl shadow-md p-6'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            {['stripe', 'razorpay', 'cod'].map((item) => (
              <div
                key={item}
                onClick={() => setMethod(item)}
                className={`payment-card ${method === item ? 'active' : ''}`}
              >
                <span className={`radio ${method === item ? 'checked' : ''}`} />
                {item === 'cod'
                  ? <p className='font-medium'>CASH ON DELIVERY</p>
                  : <img src={item === 'stripe' ? assets.stripe_logo : assets.razorpay_logo} className='h-5' />
                }
              </div>
            ))}
          </div>

          <div className='text-end mt-8'>
            <button
              type='submit'
              onClick={() => navigate('/orders')}
              className='btn-primary'
            >
              PLACE ORDER
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder

