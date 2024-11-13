import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../styles/RunUpsPage.module.css';

const RunUpsPage = () => {
  const [runUps, setRunUps] = useState([]);
  const [filteredRunUps, setFilteredRunUps] = useState([]);
  const [filters, setFilters] = useState({
    pace: '',
    distance: '',
    timeFrame: '',
  });

  useEffect(() => {
    // Fetch RunUps from API or use mock data
    const fetchedRunUps = [
      { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-11-13T17:00:00', host: 'John Doe' },
      { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-11-14T18:30:00', host: 'Jane Smith' },
      { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-11-15T06:30:00', host: 'Mike Johnson' },
      { id: 4, distance: '8km', pace: '5:15 /km', location: 'Marina Green', startTime: '2023-11-16T19:00:00', host: 'Emily Brown' },
      { id: 5, distance: '12km', pace: '5:50 /km', location: 'Lands End', startTime: '2023-11-17T08:00:00', host: 'David Wilson' },
    ];
    setRunUps(fetchedRunUps);
    setFilteredRunUps(fetchedRunUps);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = runUps;
    if (filters.pace) {
      filtered = filtered.filter(runUp => runUp.pace.includes(filters.pace));
    }
    if (filters.distance) {
      filtered = filtered.filter(runUp => runUp.distance.includes(filters.distance));
    }
    if (filters.timeFrame) {
      // Implement time frame filtering logic here
    }
    setFilteredRunUps(filtered);
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
    <Container className={styles.runUpsPageContainer}>
      <h1 className={styles.pageTitle}>RunUps in Your City</h1>
      <Row className={styles.filterSection}>
        <Col md={3}>
          <Form.Group controlId="paceFilter">
            <Form.Label>Pace</Form.Label>
            <Form.Control 
              type="text" 
              name="pace" 
              value={filters.pace} 
              onChange={handleFilterChange} 
              placeholder="e.g., 5:30 /km"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="distanceFilter">
            <Form.Label>Distance</Form.Label>
            <Form.Control 
              type="text" 
              name="distance" 
              value={filters.distance} 
              onChange={handleFilterChange} 
              placeholder="e.g., 5km"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="timeFrameFilter">
            <Form.Label>Time Frame</Form.Label>
            <Form.Control 
              type="text" 
              name="timeFrame" 
              value={filters.timeFrame} 
              onChange={handleFilterChange} 
              placeholder="e.g., This week"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" onClick={applyFilters} className={styles.filterButton}>
            Apply Filters
          </Button>
        </Col>
      </Row>
      <Row className={styles.runUpsList}>
        {filteredRunUps.map((runUp) => (
          <Col key={runUp.id} md={6} lg={4} className={styles.runUpCol}>
            <Link to={`/runup/${runUp.id}`} className={styles.runUpLink}>
              <div className={styles.runUpCard}>
                <h3>{runUp.distance} RunUp</h3>
                <p><FaUser /> Host: {runUp.host}</p>
                <p><FaMapMarkerAlt /> {runUp.location}</p>
                <p><FaClock /> {formatDate(runUp.startTime)}</p>
                <p><FaRoad /> Distance: {runUp.distance}</p>
                <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
                <Button variant="success" className={styles.joinButton}>Join RunUp</Button>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RunUpsPage;