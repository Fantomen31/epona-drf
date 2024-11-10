import React from 'react'
import Image from 'next/image'
import styles from '../../styles/CityProfilePage.module.css'

export default function CityHeroSection({ cityName, cityStats, imageUrl }) {
  return (
    <div className={styles.heroSection}>
      <Image
        src={imageUrl}
        alt={`${cityName} skyline`}
        className={styles.heroImage}
        fill
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.cityName}>{cityName}</h1>
        <p className={styles.cityStats}>{cityStats}</p>
      </div>
    </div>
  )
}