import React from 'react'
import { Outlet } from 'react-router-dom'
import cover from '../../assets/cover.png'
import { Card } from '../ui/card'

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center mt-3">
      <Card className="w-[80%] mt-6 h-full max-w-2xl flex flex-col lg:flex-row items-center justify-center shadow-lg lg:rounded-2xl overflow-hidden">
        
        {/* Left Section - Cover Image */}
        <div className="hidden lg:flex lg:w-[60%] items-center justify-center bg-white p-2">
          <img
            src={cover}
            alt="cover"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-full p-1">
          <Outlet />
        </div>

      </Card>
    </div>
  )
}

export default AuthLayout

