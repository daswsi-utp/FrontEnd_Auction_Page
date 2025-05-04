'use client';

import { useState } from 'react';
import styles from './bank.module.css';
import Link from 'next/link';

function BankForm() {
  const [formData, setFormData] = useState({
    bank: '',
    accountNumber: '',
    accountType: '',
    accountHolder: '',
    cci: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { bank, accountNumber, accountType, accountHolder } = formData;

    if (!bank || !accountNumber || !accountType || !accountHolder) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const savedAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    savedAccounts.push(formData);
    localStorage.setItem('bankAccounts', JSON.stringify(savedAccounts));

    setMessage('✅ Cuenta bancaria registrada exitosamente!');
    setFormData({
      bank: '',
      accountNumber: '',
      accountType: '',
      accountHolder: '',
      cci: ''
    });

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Registro de Cuenta Bancaria</h2>

        <div className={styles.inputBox}>
          <label>Banco</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            placeholder="Ingrese el nombre del banco"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Número de Cuenta</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Ej. 1234567890"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Tipo de Cuenta</label>
          <input
            type="text"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            placeholder="Ahorros o Corriente"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Titular de la Cuenta</label>
          <input
            type="text"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            placeholder="Nombre completo del titular"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>CCI (opcional)</label>
          <input
            type="text"
            name="cci"
            value={formData.cci}
            onChange={handleChange}
            placeholder="Código CCI"
          />
        </div>

        <button type="submit" className={styles.button}>
          Registrar Cuenta
        </button>

        {message && <p className={styles.success}>{message}</p>}
      </form>

      {/* Botón para regresar a la cuenta */}
      <div className={styles.returnButton}>
        <Link href="/profile">
          <button className={styles.button}>Regresar a Mi Cuenta</button>
        </Link>
      </div>
    </div>
  );
}

export default BankForm;
