import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedCarousel from './FeaturedCarousel';

const HomePage = () => {

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={12}>
          <FeaturedCarousel />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={8}>
          
        </Col>
        <Col md={4}>
          
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;