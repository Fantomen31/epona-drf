import React from 'react'
import styles from '../CityProfilePage.module.css'

export default function SectionTitle({ children }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>
}