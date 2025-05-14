//src\app\category\collectibles\page.jsx
'use client'
import styles from './collectibles.module.css'

export default function Collectibles() {
  const collectibles = [
    {
      id: 1,
      title: 'Vintage Baseball Card',
      image: '/images/card1.jpg',
      currentBid: '$250',
      endsIn: '3h 20m',
    },
    {
      id: 2,
      title: 'Rare Action Figure',
      image: '/images/figure1.jpg',
      currentBid: '$75',
      endsIn: '5h 45m',
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🧸 Category: Collectibles</h1>
      <p className={styles.description}>
        Discover auctions for rare, vintage, and unique collectible treasures.
      </p>

      <section className={styles.grid}>
        {collectibles.map(item => (
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

