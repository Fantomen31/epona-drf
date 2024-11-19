import React, { useState, useCallback } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser, FaPlus } from 'react-icons/fa';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRunups } from '../../hooks/useRunups';
import HostRunupModal from './HostRunupModal';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/RunUps.module.css';

const RunUps = () => {
  const [showModal, setShowModal] = useState(false);
  const { runups, loading, error, fetchRunups } = useRunups();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleHostRunup = useCallback(async () => {
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
  }, [currentUser, setCurrentUser, navigate]);

  const handleJoinRunup = useCallback(async (runupId) => {
    if (currentUser) {
      // TODO: Implement join runup API call
      console.log(`Joining runup with id: ${runupId}`);
    } else {
      try {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        // TODO: Implement join runup API call
        console.log(`Joining runup with id: ${runupId}`);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }
  }, [currentUser, setCurrentUser, navigate]);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleRunupCreated = useCallback(() => {
    fetchRunups();
    handleCloseModal();
  }, [fetchRunups, handleCloseModal]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }, []);

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card className={styles.runUpsCard}>
      <Card.Header className={styles.cardHeader}>
        <h3>RunUps</h3>
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles.runUpsList}>
          {runups.map((runUp) => (
            <div key={runUp.id} className={styles.runUpItem}>
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
              <Button 
                variant="success" 
                className={styles.joinButton}
                onClick={() => handleJoinRunup(runUp.id)}
              >
                Join RunUp
              </Button>
            </div>
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