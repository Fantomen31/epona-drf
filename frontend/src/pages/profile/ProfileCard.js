import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCity, FaMapMarkerAlt, FaRunning, FaUser } from 'react-icons/fa';
import styles from '../../styles/ProfileCard.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser?.profile_id) {
        console.log('No profile_id available, skipping profile fetch');
        return;
      }

      try {
        const { data } = await axiosReq.get(`/api/profiles/${currentUser.profile_id}/`);
        console.log('Fetched profile data:', data);
        setUserProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile: ' + err.message);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return { userProfile, error };
};

function ProfileCard() {
  const currentUser = useCurrentUser();
  const { userProfile, error } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current User Object:', currentUser);
    console.log('User Profile Object:', userProfile);
    console.log('Error:', error);
  }, [currentUser, userProfile, error]);

  const handleClick = () => {
    if (currentUser && userProfile) {
      navigate(`/profiles/${userProfile.id}`);
    } else {
      navigate('/login');
    }
  };

  if (error) {
    return <div className={styles.error} role="alert">{error}</div>;
  }

  if (!currentUser || !userProfile) {
    return <div className={styles.loading} aria-live="polite">Loading profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <Card onClick={handleClick} className={`${styles.profileCard} ${!currentUser && styles.notLoggedIn}`}>
        <div className={styles.iconWrapper}>
          {currentUser.profile_image ? (
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
            <Card.Title>{currentUser.username || 'User'}</Card.Title>
            <Card.Text>
              <FaMapMarkerAlt className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile.location || 'Not specified'}</span>
            </Card.Text>
            <Card.Text>
              <FaCity className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile.city || 'City not specified'}</span>
            </Card.Text>
            <Card.Text>
              <FaRunning className={styles.infoIcon} aria-hidden="true" />
              <span>{userProfile.running_level_display || 'Not specified'}</span>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileCard;