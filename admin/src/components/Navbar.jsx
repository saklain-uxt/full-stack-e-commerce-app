
import React from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Navbar = ({ setToken }) => {

  const handleLogout = () => {
    setToken('')
    toast.success('LOGOUT SUCCESSFULLY')
  }

  return (
    <div className="
      flex items-center justify-between
      px-[4%] py-3
      bg-white/70 backdrop-blur-md
      border-b shadow-sm
    ">

      {/* Logo */}
      <img
        className="w-[max(10%,80px)] select-none"
        src={assets.logo1}
        alt="logo"
      />

      {/* Animated Logout Button */}
      <button
        onClick={handleLogout}
        className="
          relative overflow-hidden
          px-6 py-2 sm:px-8 sm:py-2.5
          text-xs sm:text-sm font-medium
          text-white rounded-full
          bg-gradient-to-r from-gray-700 to-gray-900
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg
          active:scale-95
          before:absolute before:inset-0
          before:bg-white/20 before:opacity-0
          before:transition before:duration-300
          hover:before:opacity-100
        "
      >
        <span className="relative z-10">Logout</span>
      </button>

    </div>
  )
}

export default Navbar



