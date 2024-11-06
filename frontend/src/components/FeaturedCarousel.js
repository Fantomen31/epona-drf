import React from 'react';
import { Carousel } from 'react-bootstrap';
import FeaturedCard from './FeaturedCard';
import styles from '../styles/FeaturedCarousel.module.css';

const FeaturedCarousel = ({ isLoggedIn }) => {
  const featuredItems = [
    { id: 1, title: 'San Francisco', type: 'City', image: '/placeholder.svg?height=400&width=800' },
    { id: 2, title: 'Morning Runners Club', type: 'Club', image: '/placeholder.svg?height=400&width=800' },
    { id: 3, title: 'Bay to Breakers', type: 'Event', image: '/placeholder.svg?height=400&width=800' },
  ];

  return (
    <Carousel className={styles.carousel}>
      {featuredItems.map((item) => (
        <Carousel.Item key={item.id} className={styles.carouselItem}>
          <FeaturedCard
            title={item.title}
            type={item.type}
            image={item.image}
            isLoggedIn={isLoggedIn}
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.carouselTitle}>{item.title}</h3>
            <p className={styles.carouselDescription}>Top {item.type}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FeaturedCarousel;