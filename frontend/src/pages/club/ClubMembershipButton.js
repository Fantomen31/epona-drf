import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../styles/ClubProfilePage.module.css';

const ClubMembershipButton = ({ clubId }) => {
  const [isMember, setIsMember] = useState(false);

  const handleMembershipToggle = () => {
    // In a real application, you would make an API call here to join/leave the club
    setIsMember(!isMember);
  };

  return (
    <Button
      onClick={handleMembershipToggle}
      className={isMember ? styles.leaveClubButton : styles.joinClubButton}
    >
      {isMember ? 'Leave Club' : 'Join Club'}
    </Button>
  );
};

export default ClubMembershipButton;