import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/ClubProfilePage.module.css'

const ClubInfoCard = ({ type, data }) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <img src={data.image} alt={data.name} className={styles.cardImage} />
    </div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{data.name}</h3>
      {type === 'member' && (
        <p className={styles.cardText}>
          <FontAwesomeIcon icon={faRunning} className={styles.icon} />
          {data.runningLevel}
        </p>
      )}
      {type === 'event' && (
        <p className={styles.cardText}>
          <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
          {data.date}
        </p>
      )}
      {type === 'route' && (
        <p className={styles.cardText}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          {data.distance}
        </p>
      )}
      <Button className={styles.button}>View Details</Button>
    </div>
  </div>
)

export default ClubInfoCard