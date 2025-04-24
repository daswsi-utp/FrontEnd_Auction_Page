'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './profile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulación de carga de datos de usuario (puedes reemplazarlo con localStorage)
    setUser({
      name: 'John Doe',
      role: 'Usuario',
      email: 'johndoe@example.com',
      joined: '2023-01-15',
      auctionsCreated: 5,
      bidsPlaced: 15,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/'); // Redirige al inicio
  };

  const fakeBids = [
    { item: 'Reloj vintage', amount: '$120', date: '2025-04-20' },
    { item: 'Laptop gamer', amount: '$750', date: '2025-04-19' },
    { item: 'Bicicleta urbana', amount: '$200', date: '2025-04-18' },
    { item: 'Smartphone nuevo', amount: '$500', date: '2025-04-17' },
    { item: 'Cámara digital', amount: '$300', date: '2025-04-16' },
  ];

  const fakeHistory = [
    { item: 'Teclado mecánico', price: '$90', result: 'Ganada' },
    { item: 'Silla ergonómica', price: '$150', result: 'Perdida' },
    { item: 'Monitor 27"', price: '$250', result: 'Ganada' },
    { item: 'Tablet', price: '$180', result: 'Perdida' },
    { item: 'Auriculares inalámbricos', price: '$85', result: 'Ganada' },
  ];

  if (!user) return <div className={styles.loading}>Cargando perfil...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <img src="/img/avatar.png" alt="Avatar" className={styles.avatar} />
            <h2>{user.name}</h2>
            <p className={styles.role}>{user.role}</p>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Correo:</span>
              <span>{user.email}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Miembro desde:</span>
              <span>{user.joined}</span>
            </div>

            <div className={styles.stats}>
              <div className={styles.statBox}>
                <h3>{user.auctionsCreated}</h3>
                <p>Subastas creadas</p>
              </div>
              <div className={styles.statBox}>
                <h3>{user.bidsPlaced}</h3>
                <p>Ofertas realizadas</p>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/profile/edit">
                <button className={styles.button}>
                  Editar perfil
                </button>
              </Link>
              <button className={styles.button} onClick={handleLogout}>
                Cerrar sesión
              </button>
              <Link href="/Bank">
                <button className={styles.button}>
                  Registrar cuenta
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.dashboard}>
          <div className={styles.bidsSection}>
            <h3>Últimas pujas</h3>
            <ul className={styles.bidList}>
              {fakeBids.map((bid, index) => (
                <li key={index}>
                  <strong>{bid.item}</strong> - {bid.amount}
                  <span className={styles.bidDate}>({bid.date})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.historySection}>
            <h3>Historial de subastas</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Artículo</th>
                  <th>Precio</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {fakeHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.item}</td>
                    <td>{entry.price}</td>
                    <td className={entry.result === 'Ganada' ? styles.win : styles.lose}>
                      {entry.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
