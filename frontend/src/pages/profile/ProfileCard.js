import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCity, FaMapMarkerAlt, FaRunning, FaUser } from 'react-icons/fa';
import styles from '../../styles/ProfileCard.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useUserProfile } from '../../hooks/useUserProfile';

function ProfileCard() {
  const currentUser = useCurrentUser();
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentUser && userProfile) {
      navigate(`/profiles/${userProfile.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <Card onClick={handleClick} className={`${styles.profileCard} ${!currentUser && styles.notLoggedIn}`}>
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
        <Card.Body className={styles.profileCardBody}>
          <div className={`${styles.profileInfo} ${!currentUser && styles.blurred}`}>
            <Card.Title>{userProfile?.user || 'User'}</Card.Title>
            <Card.Text>
              <FaMapMarkerAlt className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile?.location || 'Not specified'}</span>
            </Card.Text>
            <Card.Text>
              <FaCity className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile?.city || 'City not specified'}</span>
            </Card.Text>
            <Card.Text>
              <FaRunning className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile?.running_level_display || 'Not specified'}</span>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileCard;