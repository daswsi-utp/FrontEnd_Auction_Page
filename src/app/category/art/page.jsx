'use client'
import styles from './art.module.css'

export default function Art() {
  // Aquí puedes reemplazar esto con datos reales de tu backend
  const auctions = [
    {
      id: 1,
      title: 'Sunset Over the Ocean',
      image: '/images/art1.jpg',
      currentBid: '$120',
      endsIn: '2h 15m',
    },
    {
      id: 2,
      title: 'Abstract Light',
      image: '/images/art2.jpg',
      currentBid: '$90',
      endsIn: '4h 10m',
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🎨 Category: Art</h1>
      <p className={styles.description}>
        Explore exclusive auctions for unique artistic creations. Bid now and own a masterpiece!
      </p>

      <section className={styles.grid}>
        {auctions.map(item => (
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
