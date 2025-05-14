'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaBell, FaEnvelope, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
  const [user, setUser] = useState(null)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('auctionUser')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auctionUser')
    setUser(null)
    window.location.href = '/auth/login'
  }

  const handleProfileClick = () => {
    setProfileDropdown(false)
    router.push('/profile')
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-amber-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xl font-bold">Subastas<span className="text-amber-400">Premium</span></span>
          </Link>

          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link href="/notificaciones" className="relative p-2 hover:text-amber-400 transition-colors">
                  <FaBell className="text-xl" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Link>

                <Link href="/mensajes" className="relative p-2 hover:text-amber-400 transition-colors">
                  <FaEnvelope className="text-xl" />
                  {messages > 0 && (
                    <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messages}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                      <FaUserCircle className="text-2xl text-gray-300" />
                    </div>
                  </button>

                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl z-50 border border-gray-700 overflow-hidden">
                      <div className="p-3 border-b border-gray-700">
                        <p className="font-medium truncate">{user.name || 'Usuario'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 transition-colors text-left"
                      >
                        <FaUserCircle className="text-gray-400" />
                        <span>Mi perfil</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 transition-colors text-left border-t border-gray-700"
                      >
                        <FaSignOutAlt className="text-gray-400" />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}