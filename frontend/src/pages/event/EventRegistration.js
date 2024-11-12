import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../styles/EventProfilePage.module.css';

const EventRegistration = ({ event }) => (
  <div className={styles.registrationSection}>
    <h2 className={styles.sectionTitle}>Registration</h2>
    <p className={styles.registrationPrice}>Price: {event.price}</p>
    <Button 
      href={event.registrationUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.registerButton}
    >
      Register Now
    </Button>
  </div>
);

export default EventRegistration;