//src\app\salePage\page.jsx
import './style.css';

export default function Home() {
  return (
    <main className="dashboard">
      <div className="subasta-principal">
        <div className="imagen-producto">
          <img
            src="https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655518_1280.jpg"
            alt="iPhone 13"
          />
        </div>
        <div className="info-producto">
          <h1>📱 iPhone 13</h1>
          <p>
            Participa en la subasta para ganar este iPhone 13 en excelentes
            condiciones.
          </p>
          <div className="detalles-subasta">
            <div>
              <span>Puja actual</span>
              <strong>$420</strong>
            </div>
            <div>
              <span>Tiempo restante</span>
              <strong>08:45</strong>
            </div>
          </div>
          <div className="oferta">
            <input type="number" placeholder="Tu oferta" />
            <button>Ofertar</button>
          </div>
          <div className="historial">
            <h3>📜 Últimas pujas</h3>
            <ul>
              <li>
                <span>@andrea</span> — <strong>$420</strong>
              </li>
              <li>
                <span>@pepe</span> — <strong>$400</strong>
              </li>
              <li>
                <span>@luis</span> — <strong>$380</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="otras-subastas">
        <h2>🔎 Otras subastas activas</h2>
        <div className="lista-subastas">
          <div className="card-subasta">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/27/16/51/illuminated-keyboard-2686774_1280.jpg"
              alt="Laptop"
            />
            <p>💻 Laptop Dell</p>
            <span>$300</span>
          </div>
          <div className="card-subasta">
            <img
              src="https://cdn.pixabay.com/photo/2020/02/10/09/18/calendar-4835848_1280.jpg"
              alt="Smartwatch"
            />
            <p>⌚ Smartwatch Samsung</p>
            <span>$90</span>
          </div>
          <div className="card-subasta">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/18/12/49/bicycle-1834265_1280.jpg"
              alt="Bicicleta"
            />
            <p>🚲 Bicicleta</p>
            <span>$220</span>
          </div>
        </div>
      </div>
    </main>
  );
}
