import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt, faRunning, faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/EventProfilePage.module.css';

const EventOverview = ({ event }) => (
  <div className={styles.eventOverview}>
    <h2 className={styles.sectionTitle}>Event Overview</h2>
    <div className={styles.eventDetails}>
      <div className={styles.detailItem}>
        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
        <span>{event.date}</span>
      </div>
      <div className={styles.detailItem}>
        <FontAwesomeIcon icon={faClock} className={styles.icon} />
        <span>{event.time}</span>
      </div>
      <div className={styles.detailItem}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <span>{event.location}</span>
      </div>
      <div className={styles.detailItem}>
        <FontAwesomeIcon icon={faRunning} className={styles.icon} />
        <span>{event.distance}</span>
      </div>
      <div className={styles.detailItem}>
        <FontAwesomeIcon icon={faUsers} className={styles.icon} />
        <span>{event.participants.toLocaleString()} participants</span>
      </div>
    </div>
    <p className={styles.eventDescription}>{event.description}</p>
  </div>
);

export default EventOverview;