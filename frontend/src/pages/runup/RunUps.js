import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import styles from '../styles/RunUpsHomePage.module.css';

const RunUps = () => {
  const runUps = [
    { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-05-15T07:00:00' },
    { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-05-16T18:30:00' },
    { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-05-17T06:30:00' },
  ];

  return (
    <Card className={styles.runUpsCard}>
      <Card.Header className={styles.cardHeader}>
        <h3>Upcoming RunUps</h3>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles.runUpsList}>
          {runUps.map((runUp) => (
            <Link key={runUp.id} to={`/runup/${runUp.id}`} className={styles.runUpLink}>
              <div className={styles.runUpItem}>
                <div className={styles.runUpDetails}>
                  <h4>{runUp.distance} RunUp</h4>
                  <div className={styles.detailsRow}>
                    <p><FaMapMarkerAlt /> {runUp.location}</p>
                    <p><FaClock /> {new Date(runUp.startTime).toLocaleString()}</p>
                  </div>
                  <div className={styles.detailsRow}>
                    <p><FaRoad /> Distance: {runUp.distance}</p>
                    <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
                  </div>
                </div>
                <Button variant="success" className={styles.joinButton}>Join</Button>
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <Link to="/runups" className={styles.viewAllLink}>
          <Button variant="primary">View All RunUps</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RunUps;