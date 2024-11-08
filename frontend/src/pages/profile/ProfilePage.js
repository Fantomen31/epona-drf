import React, { useState, useContext } from 'react';
import { Card, Offcanvas, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../App';
import styles from '../../styles/ProfilePage.module.css';

const CoreProfileInfo = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className={styles.coreProfileInfo}>
      <h3>{currentUser?.username}</h3>
      <p>Runs: 10</p>
      <p>Achievements: 5</p>
      <Link to="/profile" className={styles.viewProfileLink}>View Full Profile</Link>
    </div>
  );
};

const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.profileContainer}>
      <Card variant="outline-primary" onClick={handleShow} className={styles.profileButton}>
        Profile
      </Card>

      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="end" 
        className={styles.profileOffcanvas}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Summary</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CoreProfileInfo />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProfilePage;