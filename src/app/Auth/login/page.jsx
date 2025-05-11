'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <span>ENTRAR</span>
                <span className={styles.buttonIcon}>🏆</span>
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/auth/login/password" className={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
          <p className={styles.registerText}>
            ¿Nuevo en la plataforma?{' '}
            <Link href="/auth/register" className={styles.registerLink}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}