'use client'
import { useState } from 'react'
import styles from './settings.module.css'
import { FaSave, FaEnvelope, FaBell, FaCreditCard, FaShippingFast } from 'react-icons/fa'

export default function Settings() {
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [alerts, setAlerts] = useState(true)
  const [privacy, setPrivacy] = useState('public')

  const handleSave = (e) => {
    e.preventDefault()
    alert('Settings saved successfully')
    // Save settings to backend or localStorage here
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <FaSave className={styles.icon} /> Settings
      </h1>
      <form className={styles.settingsForm} onSubmit={handleSave}>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FaEnvelope className={styles.inputIcon} /> Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notifications" className={styles.checkboxLabel}>
            <FaBell className={styles.inputIcon} />
            <input
              id="notifications"
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className={styles.checkbox}
            />
            Receive email notifications
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>
            <FaCreditCard className={styles.inputIcon} /> Payment Method
          </label>
          <input
            id="paymentMethod"
            type="text"
            placeholder="Enter your payment method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="shippingAddress" className={styles.label}>
            <FaShippingFast className={styles.inputIcon} /> Shipping Address
          </label>
          <textarea
            id="shippingAddress"
            placeholder="Enter your shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className={styles.input}
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="alerts" className={styles.checkboxLabel}>
            <input
              id="alerts"
              type="checkbox"
              checked={alerts}
              onChange={() => setAlerts(!alerts)}
              className={styles.checkbox}
            />
            Receive alerts for new auctions
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="privacy" className={styles.label}>
            Privacy Settings
          </label>
          <select
            id="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className={styles.input}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        <button type="submit" className={styles.btnPrimary}>
          Save Changes
        </button>
      </form>
    </main>
  )
}
