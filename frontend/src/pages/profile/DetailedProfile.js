import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaMapMarkerAlt, FaRunning, FaTrophy, FaCity, FaUser } from 'react-icons/fa';
import styles from '../../styles/DetailedProfile.module.css';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

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
          <span>{userProfile.followers_count || 0} Followers</span>
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.following_count || 0} Following</span>
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.clubs_count || 0} Clubs</span>
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
      <Row className={styles.statisticsGrid}>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>1,234 km</h4>
              <p>Total Distance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>5:30 /km</h4>
              <p>Avg. Pace</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>156</h4>
              <p>Total Runs</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>120h 45m</h4>
              <p>Total Time</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievementsStack}>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> Marathon Finisher</h4>
            <p>Completed first marathon</p>
          </Card.Body>
        </Card>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> 100km Club</h4>
            <p>Ran 100km in a month</p>
          </Card.Body>
        </Card>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> Early Bird</h4>
            <p>10 runs before 7am</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DetailedProfile;