// src/app/auth/login/page.jsx

'use client'; 

import { useState } from 'react';
import styles from './login.module.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password, 'Recordarme:', rememberMe);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.icon}>
          <img src="/path/to/user-icon.png" alt="User Icon" />
        </div>
        <h1 className={styles.title}>Login UI</h1> {/* Aplica la clase title aquí */}
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
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={styles.showPassword} onClick={() => alert('Show password functionality here')}>
              👁️
            </span>
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
          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </a>
          <br />
          <a href="/auth/register" className={styles.forgotPassword}>
            ¿Deseas registrarte?
          </a>
        </div>


          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
