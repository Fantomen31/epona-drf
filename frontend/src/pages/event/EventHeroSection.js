import React from 'react';
import styles from '../../styles/EventProfilePage.module.css';

const EventHeroSection = ({ eventName, eventDate, imageUrl }) => (
  <div className={styles.heroSection}>
    <img src={imageUrl} alt={eventName} className={styles.heroImage} />
    <div className={styles.heroOverlay}></div>
    <div className={styles.heroContent}>
      <h1 className={styles.eventName}>{eventName}</h1>
      <p className={styles.eventDate}>{eventDate}</p>
    </div>
  </div>
);

export default EventHeroSection;