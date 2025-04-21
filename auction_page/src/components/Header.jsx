'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 shadow-md sticky top-0 z-50 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Subastas</h1>
      <div>
        <Link href="/Auth/login">
          <button className="bg-black border border-white text-white font-medium py-2 px-4 rounded hover:bg-white hover:text-black transition-colors">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
}
