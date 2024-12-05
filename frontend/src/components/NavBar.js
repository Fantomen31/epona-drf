import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faHome, faSignOutAlt, faUser, faCity, faRunning, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.webp';
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const getActiveIcon = () => {
    const path = location.pathname;
    if (path.includes('/profiles')) return faUser;
    if (path.includes('/cities')) return faCity;
    if (path.includes('/clubs')) return faRunning;
    if (path.includes('/events')) return faCalendarAlt;
    if (path.includes('/runups')) return faUsers;
    return faUser;
  };

  const loggedInIcons = (
    <>
      <NavLink 
        to="/" 
        className={styles.navLink}
        onClick={handleLogOut}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className={styles.faIcon}/>
        <span className={styles.linkText}>Log Out</span>
      </NavLink>
      <NavDropdown 
        title={
          <span className={styles.dropdownToggle}>
            <FontAwesomeIcon icon={getActiveIcon()} className={styles.faIcon} />
          </span>
        }
        id="basic-nav-dropdown" 
        class ="dropdown-menu show"
        className={styles.burgerMenu}
      >
        <NavDropdown.Item as={NavLink} to="/profiles/:id" className={styles.dropdownItem} activeClassName={styles.active}>
          <FontAwesomeIcon icon={faUser} className={styles.faIcon} />
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/cities" className={styles.dropdownItem} activeClassName={styles.active}>
          <FontAwesomeIcon icon={faCity} className={styles.faIcon} />
          Cities
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/clubs" className={styles.dropdownItem} activeClassName={styles.active}>
          <FontAwesomeIcon icon={faUsers} className={styles.faIcon} />
          Clubs
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/runups" className={styles.dropdownItem} activeClassName={styles.active}>
          <FontAwesomeIcon icon={faRunning} className={styles.faIcon} />
          RunUps
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink to="/login" className={styles.navLink}>
        <FontAwesomeIcon icon={faSignInAlt} className={styles.faIcon} />
        <span className={styles.linkText}>Login</span>
      </NavLink>
      <NavLink to="/signup" className={styles.navLink}>
        <FontAwesomeIcon icon={faUserPlus} className={styles.faIcon} />
        <span className={styles.linkText}>Sign-up</span>
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.navbar}>
      <Container className={styles.container}>
        <NavLink to="/" className={styles.navbarBrand}>
          <img src={logo} alt="Epona logo" height="45" />
          <span className={styles.brandText}>Epona: The Runners Hub</span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler} />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
          <Nav className={styles.nav}>
            <NavLink exact to="/" className={styles.navLink} activeClassName={styles.active}>
              <FontAwesomeIcon icon={faHome} className={styles.faIcon} />
              <span className={styles.linkText}>Home</span>
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;