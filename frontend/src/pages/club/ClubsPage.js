import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faRunning, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/ClubsPage.module.css';
import ProfileSideMenu from '../profile/ProfileSideMenu';

const ClubsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for clubs
  const clubs = [
    { id: 1, name: "San Francisco Road Runners", city: "San Francisco", members: 1200, events: 30, totalMiles: 50000 },
    { id: 2, name: "NYC Pacers", city: "New York", members: 1500, events: 40, totalMiles: 60000 },
    { id: 3, name: "London Running Collective", city: "London", members: 1000, events: 25, totalMiles: 45000 },
    { id: 4, name: "Tokyo Runners", city: "Tokyo", members: 800, events: 20, totalMiles: 35000 },
    { id: 5, name: "Paris Jogging Club", city: "Paris", members: 900, events: 22, totalMiles: 40000 },
    { id: 6, name: "Berlin Laufgruppe", city: "Berlin", members: 700, events: 18, totalMiles: 30000 },
    { id: 7, name: "Sydney Striders", city: "Sydney", members: 1100, events: 28, totalMiles: 48000 },
    { id: 8, name: "Toronto Track Club", city: "Toronto", members: 950, events: 24, totalMiles: 42000 },
  ];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <Container fluid className={styles.clubsContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.stickyHeader}>
              <h1 className={styles.pageTitle}>Explore Running Clubs</h1>
              <Form className={styles.searchForm}>
                <Form.Group controlId="clubSearch">
                  <Form.Control
                    type="text"
                    placeholder="Search clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </Form.Group>
              </Form>
            </div>
            <Row xs={1} md={2} lg={4} className={styles.clubGrid}>
              {filteredClubs.map(club => (
                <Col key={club.id} className={styles.clubCol}>
                  <Card className={styles.clubCard}>
                    <Card.Body>
                      <Card.Title className={styles.clubName}>{club.name}</Card.Title>
                      <Card.Subtitle className={styles.clubCity}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.statIcon} />
                        {club.city}
                      </Card.Subtitle>
                      <div className={styles.clubStats}>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faUsers} className={styles.statIcon} />
                          <span>{club.members} members</span>
                        </div>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faCalendarAlt} className={styles.statIcon} />
                          <span>{club.events} events</span>
                        </div>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faRunning} className={styles.statIcon} />
                          <span>{club.totalMiles.toLocaleString()} total miles</span>
                        </div>
                      </div>
                      <Link to={`/clubs/${club.id}`} className={styles.viewClubLink}>
                        View Club Profile
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

export default ClubsPage;