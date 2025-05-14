//src\app\category\jewelry\page.jsx
'use client'
import styles from './jewelry.module.css'

export default function Jewelry() {
  const jewelryItems = [
    {
      id: 1,
      title: 'Diamond Ring',
      image: '/images/diamond-ring.jpg',
      currentBid: '$2,500',
      endsIn: '1h 30m',
    },
    {
      id: 2,
      title: 'Gold Necklace',
      image: '/images/gold-necklace.jpg',
      currentBid: '$1,200',
      endsIn: '3h 15m',
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>💎 Category: Jewelry</h1>
      <p className={styles.description}>Discover exclusive auctions for luxurious jewelry and fine accessories.</p>

      <section className={styles.grid}>
        {jewelryItems.map(item => (
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
