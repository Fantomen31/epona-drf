import React from 'react'
import styles from '../../styles/CityProfilePage.module.css'

export default function CitySectionTitle({ children }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>
}