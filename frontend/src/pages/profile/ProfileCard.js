import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { CurrentUserContext } from '../../App';
import styles from '../../styles/ProfileCard.module.css';

const ProfileCard = () => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current User Object:', currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (currentUser) {
      navigate('/profile');
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
              src={currentUser.profile_image
              } 
              alt={`${currentUser.username}'s profile`} 
              className={styles.profileImage}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          ) : (
            <FaUser className={styles.profileIcon} />
          )}
        </div>
        <Card.Body className={styles.profileCardBody}>
          <div className={`${styles.profileInfo} ${!currentUser && styles.blurred}`}>
            <Card.Title>{currentUser?.username || 'User'}</Card.Title>
            <Card.Text>
              Location: {currentUser?.city || 'City not specified'}
            </Card.Text>
            <Card.Text>
              Running lvl: {currentUser?.running_level || 'Running level not specified'}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;