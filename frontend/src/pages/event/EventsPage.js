import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faRunning, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/EventsPage.module.css';
import ProfileSideMenu from '../profile/ProfileSideMenu';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    { id: 1, name: "San Francisco Marathon", city: "San Francisco", date: "July 23, 2023", participants: 25000, distance: "26.2 miles" },
    { id: 2, name: "Bay to Breakers", city: "San Francisco", date: "May 21, 2023", participants: 50000, distance: "12K" },
    { id: 3, name: "New York City Marathon", city: "New York", date: "November 5, 2023", participants: 50000, distance: "26.2 miles" },
    { id: 4, name: "Boston Marathon", city: "Boston", date: "April 17, 2023", participants: 30000, distance: "26.2 miles" },
    { id: 5, name: "Chicago Marathon", city: "Chicago", date: "October 8, 2023", participants: 45000, distance: "26.2 miles" },
    { id: 6, name: "London Marathon", city: "London", date: "April 23, 2023", participants: 40000, distance: "26.2 miles" },
    { id: 7, name: "Berlin Marathon", city: "Berlin", date: "September 24, 2023", participants: 44000, distance: "26.2 miles" },
    { id: 8, name: "Tokyo Marathon", city: "Tokyo", date: "March 5, 2023", participants: 38000, distance: "26.2 miles" },
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <Container fluid className={styles.eventsContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.sidebarWrapper}>
            <ProfileSideMenu />
          </div>
          <div className={styles.mainContent}>
            <div className={styles.stickyHeader}>
              <h1 className={styles.pageTitle}>Explore Running Events</h1>
              <Form className={styles.searchForm}>
                <Form.Group controlId="eventSearch">
                  <Form.Control
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </Form.Group>
              </Form>
            </div>
            <Row xs={1} md={2} lg={3} className={styles.eventGrid}>
              {filteredEvents.map(event => (
                <Col key={event.id} className={styles.eventCol}>
                  <Card className={styles.eventCard}>
                    <Card.Body>
                      <Card.Title className={styles.eventName}>{event.name}</Card.Title>
                      <Card.Subtitle className={styles.eventCity}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.statIcon} />
                        {event.city}
                      </Card.Subtitle>
                      <div className={styles.eventStats}>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faCalendarAlt} className={styles.statIcon} />
                          <span>{event.date}</span>
                        </div>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faUsers} className={styles.statIcon} />
                          <span>{event.participants.toLocaleString()} participants</span>
                        </div>
                        <div className={styles.statItem}>
                          <FontAwesomeIcon icon={faRunning} className={styles.statIcon} />
                          <span>{event.distance}</span>
                        </div>
                      </div>
                      <Link to={`/events/${event.id}`} className={styles.viewEventLink}>
                        View Event Details
                      </Link>
                    </Card.Body>  
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventsPage;