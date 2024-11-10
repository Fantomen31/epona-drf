import React from 'react'
import styles from '../../styles/CityProfilePage.module.css'

export default function CityCardGrid({ children }) {
  return (
    <div className={styles.cardGrid}>
      {children}
    </div>
  )
}