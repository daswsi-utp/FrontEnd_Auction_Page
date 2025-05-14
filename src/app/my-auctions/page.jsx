'use client'
import styles from './my-auctions.module.css'
import { FaGavel, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'

export default function MyAuctions() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <FaGavel className={styles.icon} /> My Auctions
      </h1>
      <p className={styles.description}>
        Track your ongoing and completed auctions, view details, and place new bids.
      </p>
      <ul className={styles.auctionList}>
        <li className={styles.auctionItem}>
          <h3>Auction #1: iPhone 13</h3>
          <p className={`${styles.status} ${styles.active}`}>
            <FaHourglassHalf className={styles.statusIcon} /> Active
          </p>
          <button className={styles.btnPrimary}>View Details</button>
        </li>
        <li className={styles.auctionItem}>
          <h3>Auction #2: Dell Laptop</h3>
          <p className={`${styles.status} ${styles.completed}`}>
            <FaCheckCircle className={styles.statusIcon} /> Completed
          </p>
          <button className={styles.btnPrimary}>View Details</button>
        </li>
      </ul>
    </main>
  )
}
