import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser, FaPlus } from 'react-icons/fa';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRunups } from '../../hooks/useRunups';
import HostRunupModal from '../runup/HostRunupModal';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/RunUps.module.css';

const RunUps = () => {
  const [showModal, setShowModal] = useState(false);
  const { runups, fetchRunups } = useRunups();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRunups();
  }, [fetchRunups]);

  const handleHostRunup = async () => {
    if (currentUser) {
      setShowModal(true);
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        setShowModal(true);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleRunupCreated = () => {
    fetchRunups();
  };

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
          {runups.map((runUp) => (
            <Link key={runUp.id} to={`/runups/${runUp.id}`} className={styles.runUpLink}>
              <div className={styles.runUpItem}>
                <div className={styles.runUpDetails}>
                  <div className={styles.runUpHeader}>
                    <h4>{runUp.distance}km RunUp - <FaUser/> {runUp.host.username} </h4> 
                  </div>
                  <div className={styles.runUpInfo}>
                    <div className={styles.infoColumn}>
                      <p><FaMapMarkerAlt className={styles.infoIcon} /> {runUp.location}</p>
                      <p><FaClock className={styles.infoIcon} /> {formatDate(runUp.date_time)}</p>
                    </div>
                    <div className={styles.infoColumn}>
                      <p><FaRoad className={styles.infoIcon} /> Distance: {runUp.distance}km</p>
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
          <Button variant="success" className={styles.hostButton} onClick={handleHostRunup}>
            <FaPlus /> Host RunUp
          </Button>
        </div>
      </Card.Footer>
      {showModal && (
        <HostRunupModal 
          show={showModal} 
          handleClose={handleCloseModal} 
          onRunupCreated={handleRunupCreated}
        />
      )}
    </Card>
  );
};

export default RunUps;