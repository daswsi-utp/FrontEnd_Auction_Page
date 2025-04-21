'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal de recuperación
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryUsername, setRecoveryUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password, 'Recordarme:', rememberMe);
  };

  const handleRecovery = () => {
    console.log('Recuperación para:', recoveryEmail, recoveryUsername);
    setShowModal(false);
    setRecoveryEmail('');
    setRecoveryUsername('');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.icon}>
          <img src="/img/avatar.png" alt="login-img" />
        </div>
        <h1 className={styles.title}>Login</h1>
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
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>
          </div>

          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <div className={styles.links}>
            <a href="#" onClick={() => setShowModal(true)} className={styles.forgotPassword}>
              Forgot password?
            </a>
            <br />
            <Link href="/Auth/register">
              <span className={styles.forgotPassword}>¿Deseas registrarte?</span>
            </Link>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>

      {/* Modal de recuperación de contraseña */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Recuperar contraseña</h2>
            <input
              type="text"
              placeholder="Tu nombre de usuario"
              value={recoveryUsername}
              onChange={(e) => setRecoveryUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleRecovery}>Enviar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
