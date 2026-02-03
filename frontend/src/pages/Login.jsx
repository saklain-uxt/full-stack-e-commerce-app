
import React, { useContext, useState ,useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEye, FiEyeOff, FiMoon, FiSun } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { ShopContext } from '../context/ShopeContext'
import axios from 'axios'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)

   const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')




  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)

     try {
        if (currentState === 'Sign Up') {
          
          const response = await  axios.post(backendUrl + '/api/user/register',{name,email,password})
         console.log(response)
          if (response.data.success) {
            console.log(response.data.token)
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error("my error"+error.message)
      }



    setTimeout(() => {
      setLoading(false)
      //toast.success('succes')
    }, 2000)
  }
   useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div
      className={`flex items-center justify-center relative overflow-hidden
  pt-10 pb-16 mt-10
  px-4 sm:px-8 md:px-16 lg:px-40 
  transition-colors duration-500
      ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
  : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
     
     
          
      }`}
    >
      {/* ✨ Glow blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl" />

      {/* 🌙 Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-14 right-12  z-50 p-2 rounded-full bg-white/30 backdrop-blur border border-white/40"
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>

      {/* 🧊 Glass Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] sm:max-w-96 bg-white/30 backdrop-blur-2xl border  border-white/40 rounded-2xl p-6 shadow-xl"
      >
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <motion.h2
            key={currentState}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-gray-800"
          >
            {currentState}
          </motion.h2>
          <div className="h-[2px] w-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-2" />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {currentState !== 'Login' && (
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                type="text"
                placeholder="Name"
                required
                className="input-glass"
                onChange={(e)=>setName(e.target.value)} value={name}
              />
            )}
          </AnimatePresence>

          <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  placeholder="Email" required className="input-glass" />

          {/* 🔐 Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="input-glass pr-10"
              onChange={(e)=>setPasword(e.target.value)} value={password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between text-sm mt-3 text-gray-700">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">
              Login here
            </p>
          )}
        </div>

        {/* 🌈 Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}


          disabled={loading}
          className="mt-6 w-full py-2 rounded-lg text-white font-medium
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
          bg-[length:200%_200%] animate-gradient"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            currentState === 'Login' ? 'Sign In' : 'Sign Up'
          )}
        </motion.button>
      </motion.form>

      {/* Styles */}
      <style>
        {`
          .input-glass {
            width: 100%;
            padding: 10px 12px;
            border-radius: 8px;
            background: rgba(255,255,255,0.5);
            border: 1px solid rgba(255,255,255,0.6);
            outline: none;
          }

          .input-glass:focus {
            border-color: #a855f7;
            background: rgba(255,255,255,0.7);
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradient {
            animation: gradient 4s ease infinite;
          }
        `}
      </style>
    </div>
  )
}

export default Login






