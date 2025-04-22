'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-white text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          
        </div>

        <nav className="flex flex-col gap-4 p-4">
          <Link href="/" className="hover:text-blue-400 transition-colors">🏠 {isOpen && 'Inicio'}</Link>
          <Link href="/Auth/Register" className="hover:text-blue-400 transition-colors">📝 {isOpen && 'Registro'}</Link>
          <Link href="/bank" className="hover:text-blue-400 transition-colors">🏦 {isOpen && 'Cuenta Bancaria'}</Link>
          {/* AQUI PONDRE LOS OTROS LINKS */}
        </nav>
      </div>
    </div>
  );
}
