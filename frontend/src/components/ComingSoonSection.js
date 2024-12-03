import React from 'react';
import { Card } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import styles from '../styles/ComingSoonSection.module.css';


const ComingSoonSection = ({ title }) => (
  <Card className={styles.comingSoonCard}>
    <Card.Body>
      <h3 className={styles.comingSoonTitle}>{title}</h3>
      <div className={styles.comingSoonContent}>
        <FaClock className={styles.comingSoonIcon} />
        <p>Coming Soon!</p>
        <p>We're working hard to bring you exciting new features.</p>
      </div>
    </Card.Body>
  </Card>
);

export default ComingSoonSection;