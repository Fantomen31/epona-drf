import React from 'react'
import styles from '../CityProfilePage.module.css'

export default function CardGrid({ children }) {
  return (
    <div className={styles.cardGrid}>
      {children}
    </div>
  )
}