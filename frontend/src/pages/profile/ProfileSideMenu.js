import React from 'react';
import { Link } from 'react-router-dom';
import { FaRoute, FaTrophy, FaUsers, FaCity, FaCalendarAlt, FaUser, FaRunning } from 'react-icons/fa';
import styles from '../../styles/ProfileSideMenu.module.css';

const ProfileSideMenu = () => {
  return (
    <nav className={styles.sideMenu}>
      <ul className={styles.menuList}>
        <li className={`${styles.menuItem} ${styles.disabled}`}>
          <FaRoute className={styles.icon} />
          <span>Routes</span>
        </li>
        <li className={`${styles.menuItem} ${styles.disabled}`}>
          <FaTrophy className={styles.icon} />
          <span>Leaderboards</span>
        </li>
        <li className={styles.menuItem}>
          <Link to="/clubs">
            <FaUsers className={styles.icon} />
            <span>Clubs</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/cities">
            <FaCity className={styles.icon} />
            <span>Cities</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/events">
            <FaRunning className={styles.icon} />
            <span>Events</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/profile">
            <FaUser className={styles.icon} />
            <span>Profile</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/calendar">
            <FaCalendarAlt className={styles.icon} />
            <span>Calendar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSideMenu;