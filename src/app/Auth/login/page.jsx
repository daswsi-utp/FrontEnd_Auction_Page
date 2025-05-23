// src/app/auth/login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';
import axiosUsuario from '../../../lib/axiosUsuario';
import { setToken } from '../../../utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axiosUsuario.post('/auth/login', {
        email,
        password,
      });

      const token = response.headers['authorization']?.replace("Bearer ", "") || response.data?.token;

      if (!token) {
        throw new Error('No se recibió token de autenticación');
      }

      setToken(token);
      localStorage.setItem('auctionUser', JSON.stringify(response.data.usuario));

      router.push('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Credenciales incorrectas. Inténtalo nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img 
              src="/img/subasta.jpg" 
              alt="Subasta Logo" 
              className={styles.logoImage}
            />
            <div className={styles.gavelIcon}>🔨</div>
          </div>
          <h1 className={styles.title}>Puja y Gana</h1>
          <p className={styles.subtitle}>Accede a las mejores subastas online</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label>Correo electrónico</label>
            <span className={styles.inputIcon}>✉️</span>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label>Contraseña</label>
            <span className={styles.inputIcon}>🔒</span>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        <div className={styles.footer}>
          <Link href="/auth/register" className={styles.registerLink}>
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}