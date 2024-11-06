import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from '../styles/FeaturedCarousel.module.css';

import nycCityImage from '../assets/nycFeatured.webp';
import centralParkRunnersImage from '../assets/nyc-club.jpg';
import nycMarathonImage from '../assets/nyc-marathon-events.png';

const placeholderData = [
  {
    type: 'City',
    name: 'New York City',
    image: nycCityImage,
    stat: '50,000 runners',
    emoji: '🏙️',
  },
  {
    type: 'Club',
    name: 'Central Park Runners',
    image: centralParkRunnersImage,
    stat: '5,000 members',
    emoji: '👥',
  },
  {
    type: 'Event',
    name: 'NYC Marathon',
    image: nycMarathonImage,
    stat: '50,000 participants',
    emoji: '🏃',
  },
];

const FeaturedCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.spotlightTitle}>Trending Now</h2>
      <Carousel fade interval={5000} className={styles.carousel} indicators={true}>
        {placeholderData.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={item.image}
              alt={item.name}
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3 className={styles.captionTitle}>
                Popular {item.type} 
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