//src\app\favorites\page.jsx
'use client'
import styles from './favorites.module.css'

export default function Favorites() {
  const favorites = [
    {
      id: 1,
      title: 'iPhone 13',
      image: 'https://cdn.pixabay.com/photo/2021/09/25/17/43/iphone-13-6655518_1280.jpg',
      currentBid: '$820',
      endsIn: '1h 15m'
    },
    {
      id: 2,
      title: 'Dell Gaming Laptop',
      image: 'https://cdn.pixabay.com/photo/2017/08/27/16/51/illuminated-keyboard-2686774_1280.jpg',
      currentBid: '$1,050',
      endsIn: '3h 40m'
    }
  ]

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>⭐ Favorites</h1>
      <p className={styles.description}>Products you’re watching and ready to bid on.</p>

      <section className={styles.grid}>
        {favorites.map(item => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <h2 className={styles.name}>{item.title}</h2>
              <p className={styles.bid}>Current Bid: {item.currentBid}</p>
              <p className={styles.ends}>Ends In: {item.endsIn}</p>
              <button className={styles.button}>View Auction</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
