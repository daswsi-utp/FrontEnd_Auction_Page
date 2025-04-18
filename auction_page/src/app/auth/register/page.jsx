'use client';

import { useState } from 'react';
import styles from '../register/register.module.css'; 

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      name: username,
      email,
      password,
      role: 'Comprador/Vendedor',
      joined: new Date().toISOString().split('T')[0],
      avatar: '/path/to/user-icon.png',
      auctionsCreated: 0,
      bidsPlaced: 0,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = '/profile';
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.icon}>
          <img src="/path/to/user-icon.png" alt="User Icon" />
        </div>
        <h1 className={styles.title}>Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.links}>
            <a href="/auth/login" className={styles.forgotPassword}>
              ¿Ya tienes una cuenta? Inicia sesión
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
