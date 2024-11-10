import React from 'react'
import styles from '../CityProfilePage.module.css'

export default function IconWrapper({ icon: Icon, text }) {
  return (
    <div className={styles.iconWrapper}>
      <Icon className={styles.icon} />
      <span className={styles.cardText}>{text}</span>
    </div>
  )
}