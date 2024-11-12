import React from 'react'
import styles from '../../styles/ClubProfilePage.module.css'

const ClubHeroSection = ({ clubName, clubStats, imageUrl }) => (
  <div className={styles.heroSection}>
    <img src={imageUrl} alt={clubName} className={styles.heroImage} />
    <div className={styles.heroOverlay}></div>
    <div className={styles.heroContent}>
      <h1 className={styles.clubName}>{clubName}</h1>
      <p className={styles.clubStats}>{clubStats}</p>
    </div>
  </div>
)

export default ClubHeroSection