import React, { useEffect  } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCity, FaMapMarkerAlt, FaRunning, FaUser } from 'react-icons/fa';
import styles from '../../styles/ProfileCard.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';



function ProfileCard () {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();


  useEffect(() => {
    console.log('Current User Object:', currentUser);

  }, [currentUser]);

  const handleClick = () => {
    if (currentUser) {
      navigate('/profiles/:id');
    } else {
      navigate('/login');
    }
  };


  return (
    <div className={styles.profileContainer}>
      <Card onClick={handleClick} className={`${styles.profileCard} ${!currentUser && styles.notLoggedIn}`}>
        <div className={styles.iconWrapper}>
          {currentUser?.profile_image? (
            <img 
              src={currentUser.profile_image} 
              alt={`${currentUser.username}'s profile`} 
              className={styles.profileImage}
            />
          ) : (
            <FaUser className={styles.profileIcon} />
          )}
        </div>
        <Card.Body className={styles.profileCardBody}>
          <div className={`${styles.profileInfo} ${!currentUser && styles.blurred}`}>
          <Card.Title>{currentUser?.username || 'User'}</Card.Title>
            <Card.Text>
              <FaMapMarkerAlt className={styles.infoIcon} />  {currentUser?.location || 'Not specified'}
            </Card.Text>
            <Card.Text>
              <FaCity className={styles.infoIcon} />  {currentUser?.city || 'City not specified'}
            </Card.Text>
            <Card.Text>
              <FaRunning className={styles.infoIcon} />  {currentUser?.running_level || 'Not specified'}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;