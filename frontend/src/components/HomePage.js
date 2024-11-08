import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedCarousel from './FeaturedCarousel';
import ProfilePage from '../pages/profile/ProfilePage';

const HomePage = () => {

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={7}>
          <FeaturedCarousel />
        </Col>
        <Col md={5}>
        <ProfilePage />
        </Col>
      </Row >
    </Container>
  );
};

export default HomePage;