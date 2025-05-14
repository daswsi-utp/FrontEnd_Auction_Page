//src\app\category\electronics\page.jsx
'use client'
import styles from './electronics.module.css'

export default function Electronics() {
  const electronics = [
    {
      id: 1,
      title: 'iPhone 14 Pro Max',
      image: '/images/iphone14.jpg',
      currentBid: '$900',
      endsIn: '2h 10m',
    },
    {
      id: 2,
      title: 'Sony WH-1000XM5 Headphones',
      image: '/images/sony-headphones.jpg',
      currentBid: '$180',
      endsIn: '4h 50m',
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🔌 Category: Electronics</h1>
      <p className={styles.description}>
        Find the best auctions on the latest gadgets, phones, and electronics.
      </p>

      <section className={styles.grid}>
        {electronics.map(item => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.bid}>Current Bid: {item.currentBid}</p>
            <p className={styles.ends}>Ends In: {item.endsIn}</p>
            <button className={styles.button}>Place Bid</button>
          </div>
        ))}
      </section>
    </main>
  )
}
