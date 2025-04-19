'use client';

import { useEffect, useState } from 'react';
import styles from './profile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/auth/login'; // Si no hay usuario registrado, redirige al login
    }
  }, []);

  if (!user) return <div className={styles.loading}>Cargando perfil...</div>;

  return (
    <div className={styles.profileContainer}>
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
            <button className={styles.button} onClick={() => alert('Editar perfil aún no implementado')}>
              Editar perfil
            </button>
            <button className={styles.button} onClick={() => { localStorage.removeItem('user'); window.location.href = '/auth/login'; }}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
