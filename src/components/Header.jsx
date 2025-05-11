'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaUserCircle, FaSignOutAlt, FaBell, FaEnvelope, FaSearch } from 'react-icons/fa'

export default function Header() {
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('auctionUser')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auctionUser')
    router.push('/auth/login')
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-amber-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xl font-bold">Subastas<span className="text-amber-400">Premium</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
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
                <div className="flex items-center gap-3">
                  <Link href="/profile" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                    <div className="relative w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                      <FaUserCircle className="text-2xl text-gray-400" />
                    </div>
                    <span className="hidden md:inline font-medium">
                      {user.name || user.email.split('@')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:text-red-400 transition-colors"
                    title="Cerrar sesión"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}