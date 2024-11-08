import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { FaUser } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = 
  <>
    <NavLink 
    to="/" 
    className={styles.navLink}
    onClick={handleLogOut}
    >
      <FontAwesomeIcon icon={faSignInAlt} className={styles.faIcon} />
      Log Out
    </NavLink>

    <NavLink to="/profile" className={styles.navLink}>
      <FaUser className={styles.userIcon} />
    </NavLink>
  </>
  const loggedOutIcons =  (
  <>
    <NavLink  to="/login" className={styles.navLink}>
      <FontAwesomeIcon icon={faSignInAlt} className={styles.faIcon} />
      Login
    </NavLink>
  
    <NavLink to="/signup" className={styles.navLink}>
      <FontAwesomeIcon icon={faUserPlus} className={styles.faIcon} />
      Sign-up
    </NavLink>
  </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.navbar}>
      <Container className={styles.container}>
        <NavLink to="/" className={styles.navbarBrand}>
          <img 
            src={logo}
            alt="Epona logo"
            height="45"
          />
          <span className={styles.brandText}>Epona: The Runners Hub</span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler} />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>

          <Nav>
            <NavLink to="/" className={styles.navLink}>
              <FontAwesomeIcon icon={faHome} className={styles.faIcon} />
              Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;