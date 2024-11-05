import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/HeroSection.module.css';

const HeroSection = () => {
  return (
    <Container fluid className={styles.heroContainer}>
      <h1>Welcome to Epona</h1>
      <p>Discover running events and communities near you</p>
    </Container>
  );
};

export default HeroSection;