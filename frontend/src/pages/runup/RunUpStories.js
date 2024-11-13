import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/RunUpsStories.module.css';
import HostRunUpModal from './HostRunUpModal';
import { Link } from 'react-router-dom';

const RunUpsStories = () => {
  const [currentRunUpIndex, setCurrentRunUpIndex] = useState(0);
  const [showHostModal, setShowHostModal] = useState(false);

  const runUps = [
    { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-05-15T07:00:00', host: 'John Doe' },
    { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-05-16T18:30:00', host: 'Jane Smith' },
    { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-05-17T06:30:00', host: 'Mike Johnson' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentRunUpIndex < runUps.length - 1) {
        setCurrentRunUpIndex(currentRunUpIndex + 1);
      } else {
        setCurrentRunUpIndex(0);
      }
    }, 5000); // Auto-advance every 5 seconds

    return () => clearTimeout(timer);
  }, [currentRunUpIndex, runUps.length]);

  const handlePrevious = () => {
    setCurrentRunUpIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : runUps.length - 1));
  };

  const handleNext = () => {
    setCurrentRunUpIndex((prevIndex) => (prevIndex < runUps.length - 1 ? prevIndex + 1 : 0));
  };

  const currentRunUp = runUps[currentRunUpIndex];

  return (
    <div className={styles.runUpsStoriesWrapper}>
      <Card className={styles.runUpStoryCard}>
        <Card.Header className={styles.cardHeader}>
          <h3>RunUps Near You</h3>
          <Button variant="primary" onClick={() => setShowHostModal(true)} className={styles.hostButton}>
            <FaPlus /> Host RunUp
          </Button>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.storyNavigation}>
            <Button variant="link" onClick={handlePrevious} className={styles.navButton}>
              <FaChevronLeft />
            </Button>
            <div className={styles.runUpStory}>
              <h4>{currentRunUp.distance} RunUp</h4>
              <p><FaMapMarkerAlt /> {currentRunUp.location}</p>
              <p><FaClock /> {new Date(currentRunUp.startTime).toLocaleString()}</p>
              <p><FaRoad /> Distance: {currentRunUp.distance}</p>
              <p><FaTachometerAlt /> Pace: {currentRunUp.pace}</p>
              <p>Hosted by: {currentRunUp.host}</p>
            </div>
            <Button variant="link" onClick={handleNext} className={styles.navButton}>
              <FaChevronRight />
            </Button>
          </div>
          <Link to={`/runup/${currentRunUp.id}`} className={styles.joinButton}>
            <Button variant="success">Join RunUp</Button>
          </Link>
        </Card.Body>
      </Card>

      <HostRunUpModal show={showHostModal} onHide={() => setShowHostModal(false)} />
    </div>
  );
};

export default RunUpsStories;