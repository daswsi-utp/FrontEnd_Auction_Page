// src/app/layout.jsx
import './globals.css';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

export const metadata = {
  title: 'Página de Subastas',
  description: 'Subastas en línea con estilo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <NavBar />
          <div className="flex-1">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
