import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import styles from '../../styles/RunUpsPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useUserProfile } from '../../hooks/useUserProfile';

const RunUpsPage = () => {
  const currentUser = useCurrentUser();
  const { userProfile } = useUserProfile();
  const [runUps, setRunUps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRunUps = useCallback(async () => {
    if (!userProfile?.city) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axiosReq.get('/api/runups/');
      setRunUps(data.results);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching RunUps');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (currentUser && userProfile?.city) {
      fetchRunUps();
    }
  }, [currentUser, userProfile, fetchRunUps]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!currentUser) {
    return <Alert variant="warning">Please log in to view RunUps.</Alert>;
  }

  if (isLoading) {
    return <div>Loading RunUps...</div>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Container fluid className={styles.runUpsPageContainer}>
      <Row>
        <Col md={2}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContentColumn}>
          <h1 className={styles.pageTitle}>RunUps in {userProfile?.city?.name || 'Your City'}</h1>
          <Row className={styles.runUpsList}>
            {runUps.map((runUp) => (
              <Col key={runUp.id} md={6} lg={4} className={styles.runUpCol}>
                <Link to={`/runups/${runUp.id}`} className={styles.runUpLink}>
                  <div className={styles.runUpCard}>
                    <h3>{runUp.distance}km RunUp</h3>
                    <p><FaUser /> Host: {runUp.host.username}</p>
                    <p><FaMapMarkerAlt /> {runUp.location}</p>
                    <p><FaClock /> {formatDate(runUp.date_time)}</p>
                    <p><FaRoad /> Distance: {runUp.distance}km</p>
                    <p><FaTachometerAlt /> Pace: {runUp.pace} min/km</p>
                    <p>Participants: {runUp.participants_count}</p>
                    <Button variant="success" className={styles.joinButton}>
                      {runUp.is_joined ? 'Leave RunUp' : 'Join RunUp'}
                    </Button>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RunUpsPage;