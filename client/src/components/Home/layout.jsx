import React from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../common/logo'
import { Button } from '../ui/button'
import Footer from '../common/footer'

const Mainlayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const onNavigate = (path) => {
    navigate(`/${path}`)
  }

  const hideLoginButton = location.pathname === '/auth/login'
  const hideConvertButton = location.pathname === '/convert'

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white sticky top-0 z-10">
        <Logo />

        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            !hideConvertButton && (
              <Button
                className="rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                onClick={() => onNavigate('convert')}
              >
                Convert
              </Button>
            )
          ) : (
            !hideLoginButton && (
              <Button
                className="rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                onClick={() => onNavigate('auth/signup')}
              >
                Login
              </Button>
            )
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Mainlayout

