import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/CitiesPage.module.css';

const CitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for cities
  const cities = [
    { id: 1, name: 'San Francisco', country: 'USA', clubs: 15, events: 30, runners: 5000 },
    { id: 2, name: 'New York', country: 'USA', clubs: 25, events: 50, runners: 10000 },
    { id: 3, name: 'London', country: 'UK', clubs: 20, events: 40, runners: 8000 },
    { id: 4, name: 'Tokyo', country: 'Japan', clubs: 18, events: 35, runners: 7000 },
    { id: 5, name: 'Paris', country: 'France', clubs: 22, events: 45, runners: 9000 },
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className={styles.citiesContainer}>
      <h1 className={styles.pageTitle}>Explore Running Cities</h1>
      <Form className={styles.searchForm}>
        <Form.Group controlId="citySearch">
          <Form.Control
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </Form.Group>
      </Form>
      <Row xs={1} md={2} lg={3} className={styles.cityGrid}>
        {filteredCities.map(city => (
          <Col key={city.id} className={styles.cityCol}>
            <Card className={styles.cityCard}>
              <Card.Body>
                <Card.Title className={styles.cityName}>{city.name}</Card.Title>
                <Card.Subtitle className={styles.cityCountry}>{city.country}</Card.Subtitle>
                <div className={styles.cityStats}>
                  <div className={styles.statItem}>
                    <FontAwesomeIcon icon={faUsers} className={styles.statIcon} />
                    <span>{city.clubs} clubs</span>
                  </div>
                  <div className={styles.statItem}>
                    <FontAwesomeIcon icon={faCalendarAlt} className={styles.statIcon} />
                    <span>{city.events} events</span>
                  </div>
                  <div className={styles.statItem}>
                    <FontAwesomeIcon icon={faRunning} className={styles.statIcon} />
                    <span>{city.runners} runners</span>
                  </div>
                </div>
                <Link to={`/cities/${city.id}`} className={styles.viewCityLink}>
                  View City Profile
                </Link>
              </Card.Body>  
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CitiesPage;