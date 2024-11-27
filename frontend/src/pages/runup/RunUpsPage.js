import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import RunUpsSearchBar from './RunUpsSearchBar';
import styles from '../../styles/RunUpsPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useUserProfile } from '../../hooks/useUserProfile';

const RunUpsPage = () => {
  const currentUser = useCurrentUser();
  const { userProfile } = useUserProfile();
  const [runUps, setRunUps] = useState([]);
  const [filteredRunUps, setFilteredRunUps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    distance: '',
    pace: '',
    duration: '',
    dayOfWeek: '',
    time: '',
  });

  const fetchRunUps = useCallback(async () => {
    if (!userProfile?.city) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axiosReq.get('/api/runups/');
      setRunUps(data.results);
      setFilteredRunUps(data.results);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = runUps;

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(runUp => 
        runUp.location.toLowerCase().includes(lowercasedSearch) ||
        runUp.host.username.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (filters.distance) {
      filtered = filtered.filter(runUp => runUp.distance === parseInt(filters.distance));
    }
    if (filters.pace) {
      filtered = filtered.filter(runUp => runUp.pace.includes(filters.pace));
    }
    if (filters.duration) {
      filtered = filtered.filter(runUp => runUp.duration === parseInt(filters.duration));
    }
    if (filters.dayOfWeek) {
      filtered = filtered.filter(runUp => {
        const date = new Date(runUp.date_time);
        return date.toLocaleString('en-US', { weekday: 'long' }) === filters.dayOfWeek;
      });
    }
    if (filters.time) {
      filtered = filtered.filter(runUp => {
        const date = new Date(runUp.date_time);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) === filters.time;
      });
    }

    setFilteredRunUps(filtered);
  };

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
          <RunUpsSearchBar 
            searchTerm={searchTerm}
            filters={filters}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onSearch={applyFilters}
          />
          <Row className={styles.runUpsList}>
            {filteredRunUps.map((runUp) => (
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