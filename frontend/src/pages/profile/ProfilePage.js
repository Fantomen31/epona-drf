import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSideMenu from './ProfileSideMenu';
import DetailedProfile from './DetailedProfile';
import RunUps from '../runup/RunUps.js';



const ProfilePage = () => {
  return (
    <Container fluid >
      <Row>
        <Col md={2} >
          <ProfileSideMenu />
        </Col>
        <Col md={5} >
          <Row >
          <DetailedProfile />
          </Row>
        </Col>

        <Col md={5} >
          <Row >
          <RunUps />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;