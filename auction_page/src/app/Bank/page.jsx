'use client';

import { useState } from 'react';
import styles from './bank.module.css';

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
      alert('Please fill out all required fields.');
      return;
    }

    const savedAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    savedAccounts.push(formData);
    localStorage.setItem('bankAccounts', JSON.stringify(savedAccounts));

    setMessage('✅ Bank account registered successfully!');
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
        <h2 className={styles.title}>Bank Account Registration</h2>

        <div className={styles.inputBox}>
          <label>Bank</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            placeholder="Enter bank name"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="e.g. 1234567890"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Account Type</label>
          <input
            type="text"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            placeholder="Savings or Checking"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>Account Holder</label>
          <input
            type="text"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            placeholder="Full name of account holder"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label>CCI (optional)</label>
          <input
            type="text"
            name="cci"
            value={formData.cci}
            onChange={handleChange}
            placeholder="CCI Code"
          />
        </div>

        <button type="submit" className={styles.button}>
          Register Account
        </button>

        {message && <p className={styles.success}>{message}</p>}
      </form>
    </div>
  );
}

export default BankForm;
