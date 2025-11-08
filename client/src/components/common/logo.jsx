import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 ">
      <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-teal-500 text-white text-lg font-bold">
        BB
      </div>
      <div>
        <div className="text-lg font-semibold text-teal-800 hover:underline">BrailleBridge</div>
        <div className="text-xs text-green-400">AI-Powered Braille Translator</div>
      </div>
    </Link>
  )
}

export default Logo
