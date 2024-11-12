import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/EventProfilePage.module.css';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import EventHeroSection from './EventHeroSection';
import EventOverview from './EventOverview';
import EventRegistration from './EventRegistration';
import EventMap from './EventMap';

const EventProfilePage = () => {

  // Mock event data (in a real app, you'd fetch this based on the id)
  const event = {
    id: 1,
    name: "San Francisco Marathon",
    date: "July 23, 2023",
    time: "5:30 AM",
    location: "San Francisco, CA",
    distance: "26.2 miles",
    participants: 25000,
    description: "Experience the beauty of San Francisco in this scenic marathon course that takes you through the city's iconic landmarks.",
    registrationUrl: "https://www.thesfmarathon.com/",
    price: "$180",
    courseMap: "/placeholder.svg?height=400&width=600&text=Course+Map",
  };

  return (
    <Container fluid className={styles.eventProfileContainer}>
      <Row>
        <Col md={2} className={styles.sidebarColumn}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContent}>
          <EventHeroSection
            eventName={event.name}
            eventDate={event.date}
            imageUrl="/placeholder.svg?height=400&width=800&text=Event+Cover+Image"
          />
          <Row>
            <Col md={8}>
              <EventOverview event={event} />
              <EventMap mapUrl={event.courseMap} />
            </Col>
            <Col md={4}>
              <EventRegistration event={event} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EventProfilePage;