'use client';

import './globals.css';

import NavBar from '../components/NavBar.jsx';
import Header from '../components/Header.jsx';


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
