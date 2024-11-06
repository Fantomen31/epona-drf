import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from '../styles/FeaturedCarousel.module.css';

const placeholderData = [
  {
    type: 'City',
    name: 'New York City',
    image: '/placeholder.svg?height=400&width=800',
    stat: '50,000 runners',
  },
  {
    type: 'Club',
    name: 'Central Park Runners',
    image: '/placeholder.svg?height=400&width=800',
    stat: '5,000 members',
  },
  {
    type: 'Event',
    name: 'NYC Marathon',
    image: '/placeholder.svg?height=400&width=800',
    stat: '50,000 participants',
  },
];

const FeaturedCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel fade interval={5000} className={styles.carousel}>
        {placeholderData.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={item.image}
              alt={item.name}
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3 className={styles.captionTitle}>
                {item.type} Spotlight
              </h3>
              <h4 className={styles.captionName}>{item.name}</h4>
              <p className={styles.captionStat}>{item.stat}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;