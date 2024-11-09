import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSideMenu from './ProfileSideMenu';


const ProfilePage = () => {
  return (
    <Container fluid >
      <Row>
        <Col md={2} >
          <ProfileSideMenu />
        </Col>
        <Col md={5} >
          <Row >
          <div>
            Detailed Profile
          </div>
          </Row>
          <Row >
          <div>
            Place holder componenet
          </div>
          </Row>
        </Col>
        <Col md={5} >
          <Row >
          <div>
            RunUps
          </div>
          </Row>
          <Row >
          <div>
            Place holder componenet
          </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;