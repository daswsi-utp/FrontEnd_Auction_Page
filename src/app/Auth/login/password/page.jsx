//src\app\auth\login\password\page.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import styles from '../../../../app/auth/login/password/forgot-password.module.css';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envío de correo
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/auth/login" className={styles.backButton}>
          <FaArrowLeft /> Volver al login
        </Link>
        
        {!isSubmitted ? (
          <>
            <div className={styles.header}>
              <h1>Recuperar Contraseña</h1>
              <p>Ingresa tu correo electrónico para recibir instrucciones</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <FaCheckCircle className={styles.successIcon} />
            <h2>¡Correo enviado!</h2>
            <p>Hemos enviado instrucciones para restablecer tu contraseña a <strong>{email}</strong></p>
            <p>Revisa tu bandeja de entrada y la carpeta de spam.</p>
          </div>
        )}
      </div>
    </div>
  );
}