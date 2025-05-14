//src\app\category\vehicles\page.jsx
'use client'
import styles from './vehicles.module.css'

export default function Vehicles() {
  const vehicleItems = [
    {
      id: 1,
      title: '2018 BMW X5',
      image: '/images/bmw-x5.jpg',
      currentBid: '$32,000',
      endsIn: '2h 10m',
    },
    {
      id: 2,
      title: 'Harley-Davidson 2020',
      image: '/images/harley.jpg',
      currentBid: '$18,500',
      endsIn: '4h 45m',
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🚗 Category: Vehicles</h1>
      <p className={styles.description}>Auctions for cars, motorcycles, and other vehicles.</p>

      <section className={styles.grid}>
        {vehicleItems.map(item => (
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
