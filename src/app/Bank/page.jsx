'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BankAccount() {
  const router = useRouter();
  const [bankData, setBankData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'checking',
    currency: 'USD'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auctionUser'));
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    // Simular carga de datos bancarios
    const storedData = localStorage.getItem(`bankData_${user.id}`);
    if (storedData) {
      setBankData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('auctionUser'));
    localStorage.setItem(`bankData_${user.id}`, JSON.stringify(bankData));
    alert('Datos bancarios guardados');
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cuenta Bancaria</h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">Banco*</label>
          <input
            type="text"
            value={bankData.bankName}
            onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Número de cuenta*</label>
          <input
            type="text"
            value={bankData.accountNumber}
            onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Tipo de cuenta*</label>
            <select
              value={bankData.accountType}
              onChange={(e) => setBankData({...bankData, accountType: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="checking">Cuenta corriente</option>
              <option value="savings">Cuenta de ahorros</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Moneda*</label>
            <select
              value={bankData.currency}
              onChange={(e) => setBankData({...bankData, currency: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="USD">Dólares (USD)</option>
              <option value="EUR">Euros (EUR)</option>
              <option value="PEN">Soles (PEN)</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-medium"
          >
            Guardar datos bancarios
          </button>
        </div>
      </form>
    </div>
  );
}