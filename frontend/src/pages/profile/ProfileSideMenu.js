import React from 'react';
import { Link } from 'react-router-dom';
import { FaRoute, FaTrophy, FaUsers, FaCity, FaCalendarAlt, FaRunning, FaUser } from 'react-icons/fa';
import styles from '../../styles/ProfileSideMenu.module.css';

const ProfileSideMenu = () => {
  return (
    <nav className={styles.sideMenu}>
      <ul className={styles.menuList}>
        <li className={`${styles.menuItem} ${styles.disabled}`}>
          <Link to="/routes">
          <FaRoute className={styles.icon} />
          <span>Routes</span>
          </Link>
        </li>
        <li className={`${styles.menuItem} ${styles.disabled}`}>
          <Link to="/routes">
          <FaTrophy className={styles.icon} />
          <span>Leaderboards</span>
          </Link>
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
          <Link to="/profiles/:id">
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