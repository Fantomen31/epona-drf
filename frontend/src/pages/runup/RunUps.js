import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import styles from '../../styles/RunUps.module.css';

const RunUps = () => {
  const runUps = [
    { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-11-13T17:00:00', host: 'John Doe' },
    { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-11-14T18:30:00', host: 'Jane Smith' },
    { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-11-15T06:30:00', host: 'Mike Johnson' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Card className={styles.runUpsCard}>
      <Card.Header className={styles.cardHeader}>
        <h3> RunUps</h3>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles.runUpsList}>
          {runUps.map((runUp) => (
            <Link key={runUp.id} to={`/runups/${runUps.id}`} className={styles.runUpLink}>
              <div className={styles.runUpItem}>
                <div className={styles.runUpDetails}>
                  <h4>{runUp.distance} RunUp</h4>
                  <p><FaUser /> Host: {runUp.host}</p>
                  <p><FaMapMarkerAlt /> {runUp.location}</p>
                  <p><FaClock /> {formatDate(runUp.startTime)}</p>
                  <p><FaRoad /> Distance: {runUp.distance}</p>
                  <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
                </div>
                <Button variant="success" className={styles.joinButton}>Join RunUp</Button>
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <Link to="/runups" className={styles.viewAllLink}>
          <Button variant="primary" className={styles.viewAllButton}>View All RunUps</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RunUps;