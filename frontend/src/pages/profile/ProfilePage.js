import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSideMenu from './ProfileSideMenu';
import DetailedProfile from './DetailedProfile';
import MyRunups from '../runup/MyRunups.js';



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
          <MyRunups inProfilePage={true} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;