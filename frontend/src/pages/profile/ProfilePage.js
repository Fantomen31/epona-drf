import React from 'react';
import ProfileSideMenu from './ProfileSideMenu';
import ProfileDetails from './ProfileDetails'
import styles from '../styles/ProfilePage.module.css';
import RunUps from '../../components/RunUps';
import SocialComponent from '../../components/SocialComponent';


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