import React from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileSideMenu from './ProfileSideMenu';
import SocialComponent from '../../components/SocialComponent';
import RunUps from '../../components/RunUps';
import styles from '../../styles/ProfilePage.module.css';


const ProfilePage = ({ user }) => {
  return (
    <div className={styles.profileContainer}>
      <ProfileSideMenu />
      <main className={styles.mainContent}>
        <ProfileDetails user={user} />
        <div className={styles.bottomSection}>
          <RunUps />
          <SocialComponent user={user} />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;