'use client';

import { useState } from 'react';
import styles from './bank.module.css';

function BankForm() {
  const [formData, setFormData] = useState({
    banco: '',
    numeroCuenta: '',
    tipoCuenta: '',
    titular: '',
    cci: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { banco, numeroCuenta, tipoCuenta, titular } = formData;

    if (!banco || !numeroCuenta || !tipoCuenta || !titular) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const cuentas = JSON.parse(localStorage.getItem('cuentasBancarias')) || [];
    cuentas.push(formData);
    localStorage.setItem('cuentasBancarias', JSON.stringify(cuentas));

    setMensaje('✅ Cuenta registrada exitosamente.');
    setFormData({
      banco: '',
      numeroCuenta: '',
      tipoCuenta: '',
      titular: '',
      cci: ''
    });

    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Registrar Cuenta Bancaria</h2>

        <div className={styles.inputBox}>
          <label>Banco</label>
          <input
            type="text"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            placeholder="Nombre del banco"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Número de Cuenta</label>
          <input
            type="text"
            name="numeroCuenta"
            value={formData.numeroCuenta}
            onChange={handleChange}
            placeholder="Ej: 1234567890"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Tipo de Cuenta</label>
          <input
            type="text"
            name="tipoCuenta"
            value={formData.tipoCuenta}
            onChange={handleChange}
            placeholder="Ahorros o Corriente"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Titular</label>
          <input
            type="text"
            name="titular"
            value={formData.titular}
            onChange={handleChange}
            placeholder="Nombre del titular"
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

        {mensaje && <p className={styles.success}>{mensaje}</p>}
      </form>
    </div>
  );
}

export default BankForm;
