import React from 'react';
import styles from '../../styles/EventProfilePage.module.css';

const EventMap = ({ mapUrl }) => (
  <div className={styles.mapSection}>
    <h2 className={styles.sectionTitle}>Course Map</h2>
    <img src={mapUrl} alt="Event course map" className={styles.courseMap} />
  </div>
);

export default EventMap;