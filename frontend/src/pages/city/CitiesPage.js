import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faRunning } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/CitiesPage.module.css';
import ProfileSideMenu from '../profile/ProfileSideMenu';

const CitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cities = [
    { id: 1, name: 'San Francisco', country: 'USA', clubs: 15, events: 30, runners: 5000 },
    { id: 2, name: 'New York', country: 'USA', clubs: 25, events: 50, runners: 10000 },
    { id: 3, name: 'London', country: 'UK', clubs: 20, events: 40, runners: 8000 },
    { id: 4, name: 'Tokyo', country: 'Japan', clubs: 18, events: 35, runners: 7000 },
    { id: 5, name: 'Paris', country: 'France', clubs: 22, events: 45, runners: 9000 },
    { id: 6, name: 'Berlin', country: 'Germany', clubs: 17, events: 33, runners: 6500 },
    { id: 7, name: 'Sydney', country: 'Australia', clubs: 16, events: 28, runners: 5500 },
    { id: 8, name: 'Toronto', country: 'Canada', clubs: 19, events: 37, runners: 7500 },
    { id: 9, name: 'Barcelona', country: 'Spain', clubs: 14, events: 26, runners: 4800 },
    { id: 10, name: 'Amsterdam', country: 'Netherlands', clubs: 13, events: 24, runners: 4200 },
    { id: 11, name: 'Singapore', country: 'Singapore', clubs: 12, events: 22, runners: 3800 },
    { id: 12, name: 'Chicago', country: 'USA', clubs: 21, events: 42, runners: 8500 },
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <Container fluid className={styles.citiesContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
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
            <Row xs={1} md={2} lg={4} className={styles.cityGrid}>
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
          </div>
          <div className={styles.sidebarWrapper}>
            <ProfileSideMenu />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CitiesPage;