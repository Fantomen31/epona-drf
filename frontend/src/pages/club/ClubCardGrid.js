import React from 'react'
import styles from '../../styles/ClubProfilePage.module.css'

const ClubCardGrid = ({ children }) => (
  <div className={styles.cardGrid}>{children}</div>
)

export default ClubCardGrid