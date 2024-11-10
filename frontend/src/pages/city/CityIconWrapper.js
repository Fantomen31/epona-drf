import React from 'react'
import styles from '../../styles/CityProfilePage.module.css'

export default function CityIconWrapper({ icon: Icon, text }) {
  return (
    <div className={styles.iconWrapper}>
      <Icon className={styles.icon} />
      <span className={styles.cardText}>{text}</span>
    </div>
  )
}