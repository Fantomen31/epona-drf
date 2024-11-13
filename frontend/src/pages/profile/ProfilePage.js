import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSideMenu from './ProfileSideMenu';
import DetailedProfile from './DetailedProfile';
//import RunUps from '../../components/RunUps';


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
          <div>RunUps</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;