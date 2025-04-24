import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const productos = [
    { id: 1, nombre: 'Reloj antiguo', img: '/img/imagen1.jpg' },
    { id: 2, nombre: 'Obra de arte', img: '/img/imagen2.jpg' },
    { id: 3, nombre: 'Cámara vintage', img: '/img/imagen3.jpg' },
  ];

  return (
    <div>
      <h2 className="text-3xl text-black mb-4">Subastas destacadas</h2>
      <p className="text-black mb-6">Haz clic en un artículo para ver más detalles.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <Link key={producto.id} href={`/auction/${producto.id}`} className="group">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
              <Image
                src={producto.img}
                alt={producto.nombre}
                width={500}
                height={240}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white text-xl font-semibold group-hover:text-blue-400">
                  {producto.nombre}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
