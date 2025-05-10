import './globals.css'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'Subastas Premium',
  description: 'La plataforma de subastas más exclusiva en línea',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          <NavBar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center text-sm">
              © {new Date().getFullYear()} Subastas Premium - Todos los derechos reservados
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}