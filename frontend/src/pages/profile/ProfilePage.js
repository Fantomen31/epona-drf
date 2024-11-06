import React from 'react';
//import ProfileSideMenu from './ProfileSideMenu';
//import ProfileDetails from './ProfileDetails';
//import RunUp from './RunUp';
//import SocialComponent from './SocialComponent';
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = ({ user }) => {
  return (
    <div className={styles.profileContainer}>
      <ProfileSideMenu />
      <main className={styles.mainContent}>
        <ProfileDetails user={user} />
        <div className={styles.bottomSection}>
          <RunUp />
          <SocialComponent user={user} />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;