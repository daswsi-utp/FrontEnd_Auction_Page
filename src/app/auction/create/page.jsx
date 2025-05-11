'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAuction() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startPrice: '',
    endDate: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // En producción, enviar a API
    const newAuction = {
      ...formData,
      id: Date.now(),
      status: 'active',
      creator: JSON.parse(localStorage.getItem('auctionUser')).id
    };
    
    const auctions = JSON.parse(localStorage.getItem('auctions') || '[]');
    auctions.push(newAuction);
    localStorage.setItem('auctions', JSON.stringify(auctions));
    
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Crear nueva subasta</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Título*</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Descripción*</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Precio inicial ($)*</label>
            <input
              type="number"
              value={formData.startPrice}
              onChange={(e) => setFormData({...formData, startPrice: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              min="1"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Fecha de finalización*</label>
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Categoría*</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="art">Arte</option>
            <option value="jewelry">Joyas</option>
            <option value="collectibles">Coleccionables</option>
          </select>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-medium"
          >
            Publicar subasta
          </button>
        </div>
      </form>
    </div>
  );
}