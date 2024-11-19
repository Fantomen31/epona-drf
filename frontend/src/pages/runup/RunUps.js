import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser, FaPlus } from 'react-icons/fa';
import styles from '../../styles/RunUps.module.css';
import HostRunupModal from './HostRunupModal';

const RunUps = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const runUps = [
    { id: 1, distance: '5K', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-11-13T17:00:00', host: 'John Doe' },
    { id: 2, distance: '10K', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-11-14T18:30:00', host: 'Jane Smith' },
    { id: 3, distance: '15K', pace: '5:45 /km', location: 'Presidio', startTime: '2023-11-15T06:30:00', host: 'Mike Johnson' },
    { id: 4, distance: '15K', pace: '5:45 /km', location: 'Presidio', startTime: '2023-11-15T06:30:00', host: 'Mike Johnson' },
    { id: 5, distance: '15K', pace: '5:45 /km', location: 'Presidio', startTime: '2023-11-15T06:30:00', host: 'Mike Johnson' },
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
        <h3>RunUps</h3>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles.runUpsList}>
          {runUps.map((runUp) => (
            <Link key={runUp.id} to={`/runups/${runUp.id}`} className={styles.runUpLink}>
              <div className={styles.runUpItem}>
                <div className={styles.runUpDetails}>
                  <div className={styles.runUpHeader}>
                    <h4>{runUp.distance} RunUp - <FaUser/> {runUp.host} </h4> 
                  </div>
                  <div className={styles.runUpInfo}>
                    <div className={styles.infoColumn}>
                      <p><FaMapMarkerAlt className={styles.infoIcon} /> {runUp.location}</p>
                      <p><FaClock className={styles.infoIcon} /> {formatDate(runUp.startTime)}</p>
                    </div>
                    <div className={styles.infoColumn}>
                      <p><FaRoad className={styles.infoIcon} /> Distance: {runUp.distance}</p>
                      <p><FaTachometerAlt className={styles.infoIcon} /> Pace: {runUp.pace}</p>
                    </div>
                  </div>
                </div>
                <Button variant="success" className={styles.joinButton}>Join RunUp</Button>
              </div>
            </Link>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <div className={styles.viewAllLinkWrapper}>
          <Link to="/runups" className={styles.viewAllLink}>
            <Button variant="primary" className={styles.viewAllButton}>View All RunUps</Button>
          </Link>
        </div>
        <div className={styles.hostButtonWrapper}>
          <Button variant="success" className={styles.hostButton} onClick={handleShowModal}>
            <FaPlus /> Host RunUp
          </Button>
        </div>
      </Card.Footer>
      <HostRunupModal show={showModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default RunUps;