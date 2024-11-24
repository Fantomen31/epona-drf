import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import styles from '../../styles/EditProfilePage.module.css';
import EditProfileForm from './EditProfileForm';
import ProfileSideMenu from './ProfileSideMenu';

const EditProfilePage = () => {
  const { userProfile, refreshUserProfile } = useUserProfile();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleProfileUpdated = (updatedProfile) => {
    refreshUserProfile();
    navigate('/profile');
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ProfileSideMenu />
        </Col>
        <Col md={9}>
          <div className={styles.editProfilePageContent}>
            <h1 className={styles.pageTitle}>Edit Profile</h1>
            <EditProfileForm 
              userProfile={userProfile}
              onCancel={handleCancel}
              onProfileUpdated={handleProfileUpdated}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;