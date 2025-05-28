'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaGavel, FaPlusCircle, FaSearch, FaHeart, FaStar } from 'react-icons/fa';

// ✅ Ruta corregida a tu utilidad de autenticación
import { isAuthenticated, getUserInfoFromToken } from '../utils/auth';

export default function HomePage() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Productos simulados
  const mockProductos = [
    {
      id: 1,
      nombre: 'Reloj antiguo Patek Philippe',
      img: '/img/imagen1.jpg',
      precio: '$1,200',
      tiempoRestante: '2h 45m',
      pujas: 12,
      categoria: 'Coleccionables',
      valoracion: 4.8
    },
    {
      id: 2,
      nombre: 'Obra de arte "Atardecer"',
      img: '/img/imagen2.jpg',
      precio: '$3,500',
      tiempoRestante: '1d 3h',
      pujas: 8,
      categoria: 'Arte',
      valoracion: 4.9
    },
    {
      id: 3,
      nombre: 'Cámara Leica vintage 1954',
      img: '/img/imagen3.jpg',
      precio: '$850',
      tiempoRestante: '5h 30m',
      pujas: 21,
      categoria: 'Coleccionables',
      valoracion: 4.7
    },
    {
      id: 4,
      nombre: 'Colección de monedas antiguas',
      img: '/img/monedas.jpg',
      precio: '$2,300',
      tiempoRestante: '3d 2h',
      pujas: 5,
      categoria: 'Coleccionables',
      valoracion: 4.5
    },
    {
      id: 5,
      nombre: 'Guitarra Fender Stratocaster',
      img: '/img/guitarra.jpg',
      precio: '$1,800',
      tiempoRestante: '12h 15m',
      pujas: 14,
      categoria: 'Música',
      valoracion: 4.6
    },
    {
      id: 6,
      nombre: 'Anillo de diamantes 2.5ct',
      img: '/img/anillo.jpg',
      precio: '$4,200',
      tiempoRestante: '6h 45m',
      pujas: 9,
      categoria: 'Joyas',
      valoracion: 4.9
    }
  ];

  // Verificar si el usuario está autenticado antes de mostrar HomePage
  useEffect(() => {
    const storedUser = localStorage.getItem('auctionUser');

    if (!isAuthenticated() || !storedUser) {
      router.push('/auth/login'); // Redirigir si no hay sesión
    } else {
      const userInfo = getUserInfoFromToken(); // Decodifica con jwt-decode
      setUser({
        nombre: JSON.parse(storedUser).nombre,
        email: userInfo?.email
      });
      setProductos(mockProductos);
      setIsLoading(false);
    }
  }, [router]);

  const handleProtectedAction = () => {
    if (!isAuthenticated()) {
      alert('Por favor inicia sesión primero');
      router.push('/auth/login');
    }
  };

  // Filtrar productos por término y categoría
  const filteredProductos = mockProductos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas las categorías' || producto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtener todas las categorías
  const categories = ['Todas las categorías', ...new Set(mockProductos.map(p => p.categoria))];

  // Mostrar pantalla de carga mientras se verifica la sesión
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando subastas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner destacado */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {user ? `Bienvenido, ${user.nombre}` : 'Subastas Exclusivas'}
          </h1>
          <p className="mb-4 max-w-2xl">Descubre objetos únicos y participa en emocionantes pujas</p>
          {user ? (
            <div className="flex gap-3">
              <Link
                href="/subastar"
                className="inline-flex items-center gap-2 bg-white text-amber-800 px-6 py-3 rounded-lg font-medium hover:bg-amber-100 transition-colors"
              >
                <FaPlusCircle /> Subastar un objeto
              </Link>
              <Link
                href="/mis-subastas"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-amber-800 transition-colors"
              >
                <FaGavel /> Mis subastas
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/auth/login"
                className="bg-white text-amber-800 hover:bg-amber-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/register"
                className="bg-amber-800 text-white hover:bg-amber-900 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select
          className="bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('Todas las categorías');
          }}
        >
          Limpiar
        </button>
      </div>

      {/* Subastas destacadas */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaGavel className="text-amber-600" />{' '}
            {selectedCategory === 'Todas las categorías' ? 'Subastas destacadas' : selectedCategory}
          </h2>
          <Link
            href="/subastas"
            className="text-amber-600 hover:text-amber-800 font-medium"
            onClick={handleProtectedAction}
          >
            Ver todas →
          </Link>
        </div>
        {filteredProductos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron subastas con los filtros seleccionados</p>
            <button
              className="mt-4 text-amber-600 hover:text-amber-800 font-medium"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas las categorías');
              }}
            >
              Mostrar todas las subastas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProductos.map((producto) => (
              <div key={producto.id} className="group transition-all hover:-translate-y-1">
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
                    <button
                      className="absolute top-2 left-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      onClick={handleProtectedAction}
                    >
                      <FaHeart className="text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 mb-1">
                      {producto.nombre}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{producto.categoria}</span>
                      <div className="flex items-center">
                        <FaStar className="text-amber-400 mr-1" />
                        <span className="text-sm font-medium">{producto.valoracion}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-lg text-gray-900">{producto.precio}</span>
                      <span className="text-sm text-gray-500">{producto.pujas} pujas</span>
                    </div>
                    <button
                      className="mt-3 w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg font-medium text-sm transition-colors"
                      onClick={handleProtectedAction}
                    >
                      Pujar ahora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de categorías */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Explora por categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories
            .filter((c) => c !== 'Todas las categorías')
            .map((category) => (
              <button
                key={category}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <FaGavel />
                </div>
                <span className="font-medium">{category}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Sección de cómo funciona */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Regístrate gratis</h3>
            <p className="text-gray-600">Crea tu cuenta en minutos y accede a todas las subastas</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">Encuentra tu objeto</h3>
            <p className="text-gray-600">Busca entre miles de artículos exclusivos</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Puja y gana</h3>
            <p className="text-gray-600">Ofrece tu mejor precio y consigue gangas increíbles</p>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Lo que dicen nuestros usuarios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                <Image src="/img/user1.jpg" alt="Usuario 1" width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold">María González</h4>
                <p className="text-amber-600 text-sm">Coleccionista de arte</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Encontré una obra de arte única que llevaba años buscando. El proceso de puja fue emocionante."
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < 5 ? 'text-amber-400' : 'text-gray-300'} mr-1`} />
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                <Image src="/img/user2.jpg" alt="Usuario 2" width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold">Carlos Martínez</h4>
                <p className="text-amber-600 text-sm">Coleccionista de relojes</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Como coleccionista, valoro la autenticidad. Esta plataforma ofrece certificados de autenticidad."
            </p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`${i < 4 ? 'text-amber-400' : 'text-gray-300'} mr-1`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}