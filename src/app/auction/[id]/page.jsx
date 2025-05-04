'use client';
import './style.css';

const productos = [
  {
    id: 1,
    nombre: '📱 iPhone 13',
    img: 'https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655518_1280.jpg',
    descripcion: 'Participa en la subasta para ganar este iPhone 13 en excelentes condiciones.',
    puja: 420,
    tiempo: '08:45',
    historial: [
      { usuario: '@andrea', cantidad: 420 },
      { usuario: '@pepe', cantidad: 400 },
      { usuario: '@luis', cantidad: 380 },
    ],
  },
  {
    id: 2,
    nombre: '💻 Laptop Dell',
    img: 'https://cdn.pixabay.com/photo/2017/08/27/16/51/illuminated-keyboard-2686774_1280.jpg',
    descripcion: 'Laptop Dell potente para trabajo y juegos.',
    puja: 300,
    tiempo: '06:20',
    historial: [
      { usuario: '@mario', cantidad: 300 },
      { usuario: '@lucia', cantidad: 270 },
    ],
  },
  {
    id: 3,
    nombre: '⌚ Smartwatch Samsung',
    img: 'https://cdn.pixabay.com/photo/2020/02/10/09/18/calendar-4835848_1280.jpg',
    descripcion: 'Smartwatch con funciones de salud y deporte.',
    puja: 90,
    tiempo: '02:10',
    historial: [
      { usuario: '@carla', cantidad: 90 },
      { usuario: '@raul', cantidad: 75 },
    ],
  },
];

export default function Home({ params }) {
  const producto = productos.find(p => p.id === parseInt(params.id));

  if (!producto) {
    return <div className="text-red-500 p-4">Producto no encontrado</div>;
  }

  return (
    <main className="dashboard">
      <div className="subasta-principal">
        <div className="imagen-producto">
          <img src={producto.img} alt={producto.nombre} />
        </div>
        <div className="info-producto">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <div className="detalles-subasta">
            <div>
              <span>Puja actual</span>
              <strong>${producto.puja}</strong>
            </div>
            <div>
              <span>Tiempo restante</span>
              <strong>{producto.tiempo}</strong>
            </div>
          </div>
          <div className="oferta">
            <input type="number" placeholder="Tu oferta" />
            <button>Ofertar</button>
          </div>
          <div className="historial">
            <h3>📜 Últimas pujas</h3>
            <ul>
              {producto.historial.map((item, index) => (
                <li key={index}>
                  <span>{item.usuario}</span> — <strong>${item.cantidad}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="otras-subastas">
        <h2>🔎 Otras subastas activas</h2>
        <div className="lista-subastas">
          {productos
            .filter(p => p.id !== producto.id)
            .map(p => (
              <div className="card-subasta" key={p.id}>
                <img src={p.img} alt={p.nombre} />
                <p>{p.nombre}</p>
                <span>${p.puja}</span>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
