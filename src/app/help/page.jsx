'use client'
import styles from './help.module.css'
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaBookOpen } from 'react-icons/fa'

export default function Help() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <FaQuestionCircle className={styles.icon} /> Help Center
      </h1>
      <p className={styles.description}>
        Welcome to the Help Center. Here you’ll find everything you need to understand how our auctions work, how to bid, and how to stay secure.
      </p>

      <section className={styles.grid}>
        <div className={styles.card}>
          <FaBookOpen className={styles.cardIcon} />
          <h3>FAQ</h3>
          <p>Get answers to common questions about bidding, payments, and account management.</p>
        </div>
        <div className={styles.card}>
          <FaPhoneAlt className={styles.cardIcon} />
          <h3>Support</h3>
          <p>Contact our 24/7 customer support team if you need immediate assistance.</p>
        </div>
        <div className={styles.card}>
          <FaEnvelope className={styles.cardIcon} />
          <h3>Policies</h3>
          <p>Read about our terms of use, privacy policies, and bidding guidelines.</p>
        </div>
      </section>
    </main>
  )
}
