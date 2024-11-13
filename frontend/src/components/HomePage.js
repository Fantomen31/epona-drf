import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from '../pages/profile/ProfileCard';


const HomePage = () => {

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={7}>
        <div> Place RunUp Component here </div>
        </Col>
        <Col md={5}>
        <ProfileCard />
        </Col>
      </Row >
    </Container>
  );
};

export default HomePage;