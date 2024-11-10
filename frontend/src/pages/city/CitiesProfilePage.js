import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faRunning, faMapMarkerAlt, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/CityProfilePage.module.css';

const CityProfilePage = () => {
  const { cityId } = useParams();
  const [activeTab, setActiveTab] = useState('clubs');

  // Mock data for the city
  const city = {
    id: cityId,
    name: 'San Francisco',
    country: 'USA',
    population: 883305,
    area: '121.4 km²',
    climate: 'Mediterranean',
    clubs: 15,
    events: 30,
    runners: 5000,
  };

  // Mock data for clubs, events, and runups
  const clubs = [
    { id: 1, name: 'SF Runners', members: 500, description: 'A club for all levels of runners in San Francisco.' },
    { id: 2, name: 'Golden Gate Striders', members: 300, description: 'Specializing in trail running around the Golden Gate area.' },
  ];

  const events = [
    { id: 1, name: 'SF Marathon', date: '2023-07-23', type: 'Marathon', participants: 25000 },
    { id: 2, name: 'Bay to Breakers', date: '2023-05-21', type: '12K', participants: 50000 },
  ];

  const runups = [
    { id: 1, name: 'Morning Run in the Park', date: '2023-05-15', location: 'Golden Gate Park', distance: '5K', pace: '5:30/km', participants: 20 },
    { id: 2, name: 'Sunset Beach Run', date: '2023-05-18', location: 'Ocean Beach', distance: '10K', pace: '6:00/km', participants: 15 },
  ];

  return (
    <Container fluid className={styles.cityProfileContainer}>
      <Row>
        <Col md={3} className={styles.sidebar}>
          <h2>{city.name}</h2>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/cities" className={styles.sidebarLink}>Back to Cities</Nav.Link>
            <Nav.Link href="#clubs" className={styles.sidebarLink} onClick={() => setActiveTab('clubs')}>Clubs</Nav.Link>
            <Nav.Link href="#events" className={styles.sidebarLink} onClick={() => setActiveTab('events')}>Events</Nav.Link>
            <Nav.Link href="#runups" className={styles.sidebarLink} onClick={() => setActiveTab('runups')}>RunUps</Nav.Link>
            <Nav.Link href="#calendar" className={styles.sidebarLink}>City Calendar</Nav.Link>
          </Nav>
        </Col>
        <Col md={9} className={styles.mainContent}>
          <Card className={styles.cityDetailsCard}>
            <Card.Body>
              <Card.Title className={styles.cityName}>{city.name}, {city.country}</Card.Title>
              <div className={styles.cityInfo}>
                <p><FontAwesomeIcon icon={faUsers} /> Population: {city.population.toLocaleString()}</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Area: {city.area}</p>
                <p><FontAwesomeIcon icon={faThermometerHalf} /> Climate: {city.climate}</p>
              </div>
              <div className={styles.runningStats}>
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
            </Card.Body>
          </Card>

          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Tab.Content>
              <Tab.Pane eventKey="clubs">
                <h3>Clubs in {city.name}</h3>
                <Row xs={1} md={2} className={styles.cardGrid}>
                  {clubs.map(club => (
                    <Col key={club.id}>
                      <Card className={styles.itemCard}>
                        <Card.Body>
                          <Card.Title>{club.name}</Card.Title>
                          <Card.Text>{club.description}</Card.Text>
                          <p><FontAwesomeIcon icon={faUsers} /> {club.members} members</p>
                          <Link to={`/clubs/${club.id}`} className={styles.viewMoreLink}>View Club</Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="events">
                <h3>Events in {city.name}</h3>
                <Row xs={1} md={2} className={styles.cardGrid}>
                  {events.map(event => (
                    <Col key={event.id}>
                      <Card className={styles.itemCard}>
                        <Card.Body>
                          <Card.Title>{event.name}</Card.Title>
                          <p><FontAwesomeIcon icon={faCalendarAlt} /> {event.date}</p>
                          <p><FontAwesomeIcon icon={faRunning} /> {event.type}</p>
                          <p><FontAwesomeIcon icon={faUsers} /> {event.participants} participants</p>
                          <Link to={`/events/${event.id}`} className={styles.viewMoreLink}>View Event</Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="runups">
                <h3>RunUps in {city.name}</h3>
                <Row xs={1} md={2} className={styles.cardGrid}>
                  {runups.map(runup => (
                    <Col key={runup.id}>
                      <Card className={styles.itemCard}>
                        <Card.Body>
                          <Card.Title>{runup.name}</Card.Title>
                          <p><FontAwesomeIcon icon={faCalendarAlt} /> {runup.date}</p>
                          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {runup.location}</p>
                          <p><FontAwesomeIcon icon={faRunning} /> {runup.distance}, Pace: {runup.pace}</p>
                          <p><FontAwesomeIcon icon={faUsers} /> {runup.participants} participants</p>
                          <Link to={`/runups/${runup.id}`} className={styles.viewMoreLink}>Join RunUp</Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CityProfilePage;