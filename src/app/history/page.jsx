'use client'
import styles from './history.module.css'
import { FaGavel, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function History() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <FaGavel className={styles.icon} /> Auction History
      </h1>
      <p className={styles.description}>
        Review your bidding activity and track the results of your past auctions.
      </p>

      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Date</th>
            <th>Status</th>
            <th>Final Bid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iPhone 13</td>
            <td>May 1, 2025</td>
            <td className={styles.win}>
              <FaCheckCircle className={styles.statusIcon} /> Won
            </td>
            <td>$450</td>
          </tr>
          <tr>
            <td>Dell Laptop</td>
            <td>April 28, 2025</td>
            <td className={styles.lose}>
              <FaTimesCircle className={styles.statusIcon} /> Lost
            </td>
            <td>$350</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}
