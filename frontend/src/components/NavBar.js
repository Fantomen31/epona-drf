import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.webp';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInIcons = 
  <>
    <NavLink to="/logout" className={styles.navLink}>
    <FontAwesomeIcon icon="sign-in-alt" className={styles.faIcon} />
     Log Out
    </NavLink>
  </>
  const loggedOutIcons =  (
  <>
    <NavLink  to="/login" className={styles.navLink}>
      <FontAwesomeIcon icon="sign-in-alt" className={styles.faIcon} />
      Login
    </NavLink>
  
    <NavLink to="/signup" className={styles.navLink}>
      <FontAwesomeIcon icon="user-plus" className={styles.faIcon} />
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
              <FontAwesomeIcon icon="home" className={styles.faIcon} />
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