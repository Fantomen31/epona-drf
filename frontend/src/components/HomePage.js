import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from '../pages/profile/ProfileCard';
import RunUps from './RunUps';

const HomePage = () => {

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={7}>
        <RunUps variant="home"/>
        </Col>
        <Col md={5}>
        <ProfileCard />
        </Col>
      </Row >
    </Container>
  );
};

export default HomePage;