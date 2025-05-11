'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaGavel, FaPlusCircle, FaSearchDollar } from 'react-icons/fa'

export default function HomePage() {
  const router = useRouter()
  const productos = [
    { id: 1, nombre: 'Reloj antiguo Patek Philippe', img: '/img/imagen1.jpg', precio: '$1,200', tiempoRestante: '2h 45m', pujas: 12 },
    { id: 2, nombre: 'Obra de arte "Atardecer"', img: '/img/imagen2.jpg', precio: '$3,500', tiempoRestante: '1d 3h', pujas: 8 },
    { id: 3, nombre: 'Cámara Leica vintage 1954', img: '/img/imagen3.jpg', precio: '$850', tiempoRestante: '5h 30m', pujas: 21 },
    { id: 4, nombre: 'Colección de monedas antiguas', img: '/img/imagen4.jpg', precio: '$2,300', tiempoRestante: '3d 2h', pujas: 5 },
    { id: 5, nombre: 'Guitarra Fender Stratocaster', img: '/img/imagen5.jpg', precio: '$1,800', tiempoRestante: '12h 15m', pujas: 14 },
    { id: 6, nombre: 'Anillo de diamantes 2.5ct', img: '/img/imagen6.jpg', precio: '$4,200', tiempoRestante: '6h 45m', pujas: 9 },
  ]

  useEffect(() => {
    const user = localStorage.getItem('auctionUser')
    if (!user) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner destacado */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Subastas Exclusivas</h1>
          <p className="mb-4 max-w-2xl">Descubre objetos únicos y participa en emocionantes pujas</p>
          <Link 
            href="/subastar" 
            className="inline-flex items-center gap-2 bg-white text-amber-800 px-6 py-3 rounded-lg font-medium hover:bg-amber-100 transition-colors"
          >
            <FaPlusCircle /> Subastar un objeto
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/img/auction-hammer.png')] bg-contain bg-no-repeat bg-right opacity-20"></div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Buscar subastas..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <FaSearchDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
          <option>Todas las categorías</option>
          <option>Arte</option>
          <option>Joyas</option>
          <option>Coleccionables</option>
          <option>Electrónica</option>
        </select>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Buscar
        </button>
      </div>

      {/* Subastas destacadas */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaGavel className="text-amber-600" /> Subastas destacadas
          </h2>
          <Link href="/subastas" className="text-amber-600 hover:text-amber-800 font-medium">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <Link 
              key={producto.id} 
              href={`/auction/${producto.id}`}
              className="group transition-all hover:-translate-y-1"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 relative">
                <div className="relative h-60 w-full">
                  <Image
                    src={producto.img}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {producto.tiempoRestante}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 mb-1">
                    {producto.nombre}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg text-gray-900">{producto.precio}</span>
                    <span className="text-sm text-gray-500">{producto.pujas} pujas</span>
                  </div>
                  <button className="mt-3 w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg font-medium text-sm transition-colors">
                    Pujar ahora
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
