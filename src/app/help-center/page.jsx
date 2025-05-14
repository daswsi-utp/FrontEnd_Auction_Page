//src\app\help-center\page.jsx
import Link from 'next/link';
import { FaQuestionCircle, FaFileContract } from 'react-icons/fa';

export default function HelpCenterPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
        Bienvenido al Centro de Ayuda
      </h1>

      <p className="text-lg text-center mb-6">
        Aquí encontrarás respuestas a tus preguntas frecuentes y nuestras políticas de uso.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <Link href="/help-center/faq" className="flex items-center space-x-4">
            <FaQuestionCircle className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-2xl font-semibold">Preguntas Frecuentes</h2>
              <p className="text-gray-600">Encuentra respuestas a las dudas más comunes sobre nuestro servicio.</p>
            </div>
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
          <Link href="/help-center/policies" className="flex items-center space-x-4">
            <FaFileContract className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-2xl font-semibold">Políticas de la Página</h2>
              <p className="text-gray-600">Lee nuestras políticas de privacidad y términos de uso.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
