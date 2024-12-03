import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaMapMarkerAlt, FaRunning, FaCity, FaUser } from 'react-icons/fa';
import styles from '../../styles/DetailedProfile.module.css';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ComingSoonSection from '../../components/ComingSoonSection';

const DetailedProfile = () => {
  const { userProfile } = useUserProfile();
  const currentUser = useCurrentUser();

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const ProfileContent = () => (
    <>
      <div className={styles.profileHeader}>
        <h2>{userProfile.user}</h2>
        {currentUser && currentUser.profile_id === userProfile.id && (
          <Link to="/edit-profile" className={styles.editButton}>
            <FaEdit /> Edit Profile
          </Link>
        )}
      </div>
      <p className={styles.bio}>{userProfile.bio || 'No bio yet. Click edit to add one!'}</p>
      <div className={styles.profileDetails}>
        <p>
          <FaMapMarkerAlt /> Location: {userProfile?.location || 'Not specified'}
        </p>
        <p>
          <FaCity /> City: {userProfile?.city || 'Not specified'}
        </p>
        <p>
          <FaRunning /> Running Level: {userProfile?.running_level_display || 'Not specified'}
        </p>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <span>{userProfile.followers_count || 0}</span> Followers
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.following_count || 0}</span> Following
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.clubs_count || 0}</span> Clubs
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.detailedProfile}>
      <Card className={styles.profileCard}>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className={styles.profileImageCol}>
              <div className={styles.iconWrapper}>
                {currentUser?.profile_image ? (
                  <img 
                    src={currentUser.profile_image} 
                    alt={`${currentUser.username}'s profile`} 
                    className={styles.profileImage}
                  />
                ) : (
                  <FaUser className={styles.profileIcon} aria-label="Default user icon" />
                )}
              </div>
            </Col>
            <Col xs={12} md={8}>
              <ProfileContent />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h3 className={styles.sectionTitle}>Statistics</h3>
      <ComingSoonSection />

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <ComingSoonSection />
    </div>
  );
};

export default DetailedProfile;