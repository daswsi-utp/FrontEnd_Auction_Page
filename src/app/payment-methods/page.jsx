'use client'

import { useEffect } from 'react'
import { FaMoneyCheckAlt, FaMobileAlt, FaUniversity, FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function PaymentMethodsPage() {
  const router = useRouter()

  useEffect(() => {
    document.title = 'Payment Methods | SubastasPremium'
  }, [])

  const methods = [
    {
      title: 'Yape',
      icon: <FaMobileAlt className="text-3xl text-purple-500" />,
      description: 'Scan the QR code to pay with Yape. Number: 987654321'
    },
    {
      title: 'BCP',
      icon: <FaUniversity className="text-3xl text-blue-600" />,
      description: 'Bank: BCP | Account Number: 123-4567890-11 | Name: SubastasPremium SAC'
    },
    {
      title: 'CCI Transfer',
      icon: <FaCreditCard className="text-3xl text-green-600" />,
      description: 'CCI: 00212300456789012345 | Holder: SubastasPremium SAC'
    },
    {
      title: 'Bank Transfer',
      icon: <FaMoneyCheckAlt className="text-3xl text-amber-600" />,
      description: 'Make a traditional bank transfer to our BCP account.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Methods</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 hover:border-amber-400 transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">{method.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">{method.title}</h2>
                  <p className="text-sm text-gray-300">{method.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white font-medium transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
