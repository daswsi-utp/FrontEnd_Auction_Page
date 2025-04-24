'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaList } from 'react-icons/fa';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {

    setSearchQuery(event.target.value);

  };

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

          {/* Barra de búsqueda */}

          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar subastas..."
              className="p-2 rounded bg-gray-800 text-white w-full placeholder:text-gray-500"
            />
          </div>


          {/* Enlaces principales */}

          <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
            🏠 {isOpen && 'Inicio'}
          </Link>

          {/* Menú de categorías */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <FaList className="text-xl" />
              {isOpen && 'Categorías ⬇'}
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-full bg-gray-800 text-white rounded shadow-lg">
                <Link href="/categoria/vehiculos">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Vehículos
                  </button>
                </Link>
                <Link href="/categoria/electrodomesticos">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Electrodomésticos
                  </button>
                </Link>
                <Link href="/categoria/joyas">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Joyas
                  </button>
                </Link>
                <Link href="/categoria/arte">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Arte
                  </button>
                </Link>
                <Link href="/categoria/coleccionables">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Coleccionables
                  </button>
                </Link>

              </div>
            )}
          </div>
        </nav>

        {/* Centro de Ayuda */}
        <div className="mt-auto p-4 flex items-center justify-center">

          <Link href="/help-center" className="hover:text-blue-400 transition-colors flex items-center gap-2">

            <FaPhone className="text-xl" />
            {isOpen && 'Centro de Ayuda'}
          </Link>
        </div>
      </div>
    </div>
  );
}
