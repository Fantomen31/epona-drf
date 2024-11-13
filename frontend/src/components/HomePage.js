import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from '../pages/profile/ProfileCard';
import RunUps from '../pages/runup/RunUps.js';


const HomePage = () => {

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={7}>
        <RunUps />
        </Col>
        <Col md={5}>
        <ProfileCard />
        </Col>
      </Row >
    </Container>
  );
};

export default HomePage;