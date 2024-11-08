import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedCarousel from './FeaturedCarousel';
import ProfileCard from '../pages/profile/ProfileCard';

const HomePage = () => {

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={7}>
          <FeaturedCarousel />
        </Col>
        <Col md={5}>
        <ProfileCard />
        </Col>
      </Row >
    </Container>
  );
};

export default HomePage;