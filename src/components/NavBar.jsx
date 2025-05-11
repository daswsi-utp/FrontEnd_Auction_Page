'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes, FaHome, FaList, FaGavel, FaPlusCircle, FaHistory, FaHeart, FaCog, FaQuestionCircle } from 'react-icons/fa'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { href: '/', icon: <FaHome />, text: 'Inicio' },
    { href: '/subastar', icon: <FaPlusCircle />, text: 'Subastar' },
    { href: '/mis-subastas', icon: <FaGavel />, text: 'Mis subastas' },
    { href: '/favoritos', icon: <FaHeart />, text: 'Favoritos' },
    { href: '/historial', icon: <FaHistory />, text: 'Historial' },
    { href: '/configuracion', icon: <FaCog />, text: 'Configuración' },
  ]

  return (
    <div className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col sticky top-0`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {isOpen && (
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-amber-400">Subastas</span>Premium
          </Link>
        )}
        <button 
          onClick={toggleSidebar} 
          className="text-white hover:text-amber-400 transition-colors"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors mb-2"
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.text}</span>}
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors w-full"
          >
            <FaList className="text-xl" />
            {isOpen && (
              <>
                <span>Categorías</span>
                <span className={`ml-auto transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </>
            )}
          </button>
          
          {dropdownOpen && isOpen && (
            <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-700">
              <Link href="/categoria/arte" className="block p-2 hover:text-amber-400 transition-colors">Arte</Link>
              <Link href="/categoria/joyas" className="block p-2 hover:text-amber-400 transition-colors">Joyas</Link>
              <Link href="/categoria/coleccionables" className="block p-2 hover:text-amber-400 transition-colors">Coleccionables</Link>
              <Link href="/categoria/electronica" className="block p-2 hover:text-amber-400 transition-colors">Electrónica</Link>
              <Link href="/categoria/vehiculos" className="block p-2 hover:text-amber-400 transition-colors">Vehículos</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link 
          href="/ayuda" 
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaQuestionCircle className="text-xl" />
          {isOpen && <span>Centro de ayuda</span>}
        </Link>
      </div>
    </div>
  )
}