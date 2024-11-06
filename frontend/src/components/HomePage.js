import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedCarousel from './FeaturedCarousel';
import styles from './HomePage';

const HomePage = () => {

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={8}>
          
        </Col>
        <Col md={4}>
          
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <h2>Featured Content</h2>
          <FeaturedCarousel />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;