'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { FaGavel, FaClock, FaMoneyBillWave, FaUser } from 'react-icons/fa';

export default function AuctionDetail() {
  const router = useRouter();
  const params = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });
  const [user, setUser] = useState(null);
  const [bids, setBids] = useState([]);
  const [isBidding, setIsBidding] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const storedUser = localStorage.getItem('auctionUser');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // Simular carga de subasta desde "base de datos"
    const mockAuction = {
      id: params.id,
      title: 'Reloj Antiguo de Colección',
      description: 'Reloj de bolsillo vintage de 1920, fabricado en Suiza. Funciona perfectamente y se encuentra en excelente estado de conservación. Incluye estuche original.',
      currentBid: 1200,
      startPrice: 800,
      endTime: new Date(Date.now() + 86400000 * 3), // 3 días desde ahora
      images: ['/img/imagen1.jpg'],
      category: 'collectibles',
      creator: {
        id: 2,
        name: 'Coleccionista Antigüedades'
      },
      bids: [
        { id: 1, amount: 800, bidder: 'Usuario1', date: new Date(Date.now() - 86400000) },
        { id: 2, amount: 950, bidder: 'Usuario2', date: new Date(Date.now() - 43200000) },
        { id: 3, amount: 1200, bidder: 'Usuario3', date: new Date(Date.now() - 21600000) }
      ]
    };
    
    setAuction(mockAuction);
    setBids(mockAuction.bids);
  }, [params.id, router]);

  // Contador regresivo
  useEffect(() => {
    if (!auction) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = new Date(auction.endTime) - now;
      
      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true
        });
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          expired: false
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  const handleBid = () => {
    if (!bidAmount || isNaN(bidAmount) || !user) return;
    
    const amount = Number(bidAmount);
    if (amount <= auction.currentBid) {
      alert(`La puja debe ser mayor a $${auction.currentBid}`);
      return;
    }

    setIsBidding(true);
    
    // Simular puja
    setTimeout(() => {
      const newBid = {
        id: Date.now(),
        amount,
        bidder: user.name,
        date: new Date()
      };
      
      const updatedAuction = {
        ...auction,
        currentBid: amount,
        bids: [...auction.bids, newBid]
      };
      
      setAuction(updatedAuction);
      setBids(updatedAuction.bids);
      setBidAmount('');
      setIsBidding(false);
      
      // En producción: actualizar en la base de datos
      alert(`¡Puja de $${amount} realizada con éxito!`);
    }, 1000);
  };

  if (!auction || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sección de imágenes */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src={auction.images[0]}
              alt={auction.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-20 rounded-md overflow-hidden shadow cursor-pointer">
                <Image
                  src={auction.images[0]}
                  alt={`Vista ${i} de ${auction.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Sección de detalles */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{auction.title}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span>Categoría: {auction.category}</span>
            <span className="text-gray-400">•</span>
            <span>Vendedor: {auction.creator.name}</span>
          </div>
          
          {/* Contador regresivo */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FaClock className="text-indigo-600" />
                {timeLeft.expired ? 'Subasta finalizada' : 'Tiempo restante'}
              </h3>
              <span className="text-sm text-gray-500">
                Finaliza: {new Date(auction.endTime).toLocaleDateString()}
              </span>
            </div>
            
            {timeLeft.expired ? (
              <div className="text-center py-4 bg-red-100 text-red-700 rounded font-medium">
                Esta subasta ha finalizado
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-500">Días</div>
                </div>
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-500">Horas</div>
                </div>
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-500">Minutos</div>
                </div>
                <div className="bg-white p-2 rounded shadow">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-500">Segundos</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Información de puja actual */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-indigo-600" />
                <span className="font-semibold">Puja actual:</span>
              </div>
              <span className="text-2xl font-bold text-indigo-700">${auction.currentBid}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Precio inicial: ${auction.startPrice}</span>
              <span>{bids.length} pujas</span>
            </div>
          </div>
          
          {/* Formulario de puja */}
          {!timeLeft.expired && (
            <div className="space-y-4 mb-8">
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaGavel className="text-indigo-600" />
                  Realizar una puja
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={auction.currentBid + 1}
                    className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={`Mínimo $${auction.currentBid + 1}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Ingrese un valor mayor a la puja actual
                </p>
              </div>
              
              <button
                onClick={handleBid}
                disabled={isBidding}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors ${isBidding ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isBidding ? 'Procesando puja...' : 'Realizar puja'}
              </button>
            </div>
          )}
          
          {/* Descripción */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-2">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line">{auction.description}</p>
          </div>
        </div>
      </div>
      
      {/* Historial de pujas */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaGavel className="text-indigo-600" />
          Historial de Pujas
        </h3>
        
        {bids.length === 0 ? (
          <p className="text-gray-500 italic">No hay pujas registradas aún.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bids.sort((a, b) => b.amount - a.amount).map((bid) => (
                  <tr key={bid.id} className={bid.bidder === user.name ? 'bg-indigo-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{bid.bidder}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-indigo-600">${bid.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(bid.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(bid.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}