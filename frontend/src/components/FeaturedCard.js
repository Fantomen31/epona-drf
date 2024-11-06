import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FeaturedCard.module.css';

const FeaturedCard = ({ title, type, image, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate(`/${type.toLowerCase()}/${title.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.popularBadge}>Popular</div>
      <Card.Img variant="top" src={image} alt={title} className={styles.cardImage} />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        <Card.Text className={styles.cardText}>Top {type}</Card.Text>
        <Button 
          className={styles.learnMoreButton}
          onClick={handleClick}
        >
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FeaturedCard;