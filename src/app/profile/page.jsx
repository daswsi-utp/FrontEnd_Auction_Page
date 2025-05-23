// src/app/profile/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUser, 
  FaHistory, 
  FaGavel, 
  FaHeart, 
  FaSignOutAlt, 
  FaEdit,
  FaTrophy,
  FaMoneyBillWave,
  FaCog
} from 'react-icons/fa';
import Image from 'next/image';
import axiosUsuario from '../../lib/axiosUsuario';
import { removeToken } from '../../utils/auth';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('auctions');
  const [stats, setStats] = useState({
    auctions: 0,
    bids: 0,
    won: 0,
    favorites: 0
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosUsuario.get('/auth/user-info');
        setUser(res.data);
        setStats({
          auctions: res.data.auctions || 0,
          bids: res.data.bids || 0,
          won: res.data.wonAuctions || 0,
          favorites: res.data.favorites || 0
        });
      } catch (error) {
        removeToken();
        router.push('/auth/login');
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header del perfil */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-amber-900 to-amber-700 h-40 md:h-48"></div>
        <div className="px-6 pb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center relative -top-16">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
                <FaUser className="text-4xl md:text-5xl text-gray-500" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {user.nombre || 'Usuario'}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Miembro desde {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/profile/profileedit"
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                <FaEdit /> Editar perfil
              </Link>
              <button 
                onClick={() => router.push('/settings')}
                className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
              >
                <FaCog /> Configuración
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-full">
              <FaGavel className="text-amber-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Subastas</p>
              <p className="text-2xl font-bold">{stats.auctions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pujas</p>
              <p className="text-2xl font-bold">{stats.bids}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <FaTrophy className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ganadas</p>
              <p className="text-2xl font-bold">{stats.won}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <FaHeart className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Favoritos</p>
              <p className="text-2xl font-bold">{stats.favorites}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menú lateral */}
        <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('auctions')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'auctions' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaGavel className="flex-shrink-0" />
              <span>Mis subastas</span>
            </button>
            <button
              onClick={() => setActiveTab('bids')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'bids' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaMoneyBillWave className="flex-shrink-0" />
              <span>Mis pujas</span>
            </button>
            <button
              onClick={() => setActiveTab('won')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'won' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaTrophy className="flex-shrink-0" />
              <span>Artículos ganados</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'favorites' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaHeart className="flex-shrink-0" />
              <span>Favoritos</span>
            </button>
          </nav>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="flex-shrink-0" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'auctions' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaGavel className="text-amber-600" />
                  Mis subastas activas
                </h2>
                <Link
                  href="/subastar"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Crear nueva subasta
                </Link>
              </div>
              <div className="border rounded-lg divide-y">
                <div className="p-8 text-center">
                  <FaGavel className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">
                    No tienes subastas activas
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Cuando crees subastas, aparecerán aquí
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bids' && (
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <FaMoneyBillWave className="text-blue-600" />
                Mis pujas recientes
              </h2>
              <div className="border rounded-lg divide-y">
                <div className="p-8 text-center">
                  <FaMoneyBillWave className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">
                    No has realizado pujas
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Cuando hagas pujas, aparecerán aquí
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'won' && (
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <FaTrophy className="text-green-600" />
                Artículos ganados
              </h2>
              <div className="border rounded-lg divide-y">
                <div className="p-8 text-center">
                  <FaTrophy className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">
                    No has ganado artículos
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Cuando ganes subastas, aparecerán aquí
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <FaHeart className="text-red-600" />
                Mis favoritos
              </h2>
              <div className="border rounded-lg divide-y">
                <div className="p-8 text-center">
                  <FaHeart className="mx-auto text-4xl text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">
                    No tienes artículos favoritos
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Cuando guardes favoritos, aparecerán aquí
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}