'use client';
import Link from 'next/link';

import Link from 'next/link';
import { useState } from 'react';

const fakeUser = {
  name: 'Juan Pérez',
};

export default function Header() {
  const [user, setUser] = useState(fakeUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  return (

    <header className="bg-gray-800 text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Título de la aplicación a la izquierda */}
        <h1 className="text-2xl font-bold">Subastas</h1>

        {/* Sección de usuario a la derecha */}
        {!user ? (
          <Link
            href="/Auth/login"
            className="bg-black border border-white text-white font-medium py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
          >
            Sign In
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-black border border-white text-white font-medium py-2 px-4 rounded hover:bg-white hover:text-black transition-colors"
            >
              {user.name} ⬇
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white text-black rounded shadow-lg right-0">
                {/* Enlace actualizado a la ruta '/profile' */}
                <Link href="/profile">
                  <span
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Mi cuenta
                  </span>
                </Link>
                <span
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Log Out
                </span>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
