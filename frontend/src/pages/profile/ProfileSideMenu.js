import React from 'react';
import { Button } from "../../components/ui/button";
import { Home, User, Calendar, Users } from 'lucide-react';
import styles from '../../styles/ProfileSideMenu.module.css';

const ProfileSideMenu = () => {
  return (
    <nav className={styles.sideMenu}>
      <Button variant="ghost" className={styles.menuItem}>
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
      <Button variant="ghost" className={styles.menuItem}>
        <User className="mr-2 h-4 w-4" />
        Profile
      </Button>
      <Button variant="ghost" className={styles.menuItem}>
        <Calendar className="mr-2 h-4 w-4" />
        Events
      </Button>
      <Button variant="ghost" className={styles.menuItem}>
        <Users className="mr-2 h-4 w-4" />
        Community
      </Button>
    </nav>
  );
};

export default ProfileSideMenu;