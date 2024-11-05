import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import styles from '../styles/CardGrid.module.css';

const CardGrid = ({ category }) => {
  const items = {
    cities: [
      { id: 1, title: 'New York', runners: 5000, clubs: 50, events: 100, imageUrl: 'https://picsum.photos/100/100?random=1' },
      { id: 2, title: 'Los Angeles', runners: 4500, clubs: 45, events: 90, imageUrl: 'https://picsum.photos/100/100?random=2' },
      { id: 3, title: 'Chicago', runners: 4000, clubs: 40, events: 80, imageUrl: 'https://picsum.photos/100/100?random=3' },
      { id: 4, title: 'Houston', runners: 3500, clubs: 35, events: 70, imageUrl: 'https://picsum.photos/100/100?random=4' },
      { id: 5, title: 'Phoenix', runners: 3000, clubs: 30, events: 60, imageUrl: 'https://picsum.photos/100/100?random=5' },
      { id: 6, title: 'London', runners: 6000, clubs: 60, events: 120, imageUrl: 'https://picsum.photos/100/100?random=16' },
      { id: 7, title: 'Paris', runners: 5500, clubs: 55, events: 110, imageUrl: 'https://picsum.photos/100/100?random=17' },
      { id: 8, title: 'Berlin', runners: 5000, clubs: 50, events: 100, imageUrl: 'https://picsum.photos/100/100?random=18' },
      { id: 9, title: 'Tokyo', runners: 7000, clubs: 70, events: 140, imageUrl: 'https://picsum.photos/100/100?random=19' },
      { id: 10, title: 'Seoul', runners: 6500, clubs: 65, events: 130, imageUrl: 'https://picsum.photos/100/100?random=20' },
    ],
    clubs: [
      { id: 1, title: 'NYC Runners', members: 500, city: 'New York', imageUrl: 'https://picsum.photos/100/100?random=6' },
      { id: 2, title: 'LA Track Club', members: 450, city: 'Los Angeles', imageUrl: 'https://picsum.photos/100/100?random=7' },
      { id: 3, title: 'Chicago Sprinters', members: 400, city: 'Chicago', imageUrl: 'https://picsum.photos/100/100?random=8' },
      { id: 4, title: 'Houston Marathoners', members: 350, city: 'Houston', imageUrl: 'https://picsum.photos/100/100?random=9' },
      { id: 5, title: 'Phoenix Joggers', members: 300, city: 'Phoenix', imageUrl: 'https://picsum.photos/100/100?random=10' },
      { id: 6, title: 'London Pacers', members: 550, city: 'London', imageUrl: 'https://picsum.photos/100/100?random=21' },
      { id: 7, title: 'Paris Trotters', members: 520, city: 'Paris', imageUrl: 'https://picsum.photos/100/100?random=22' },
      { id: 8, title: 'Berlin Striders', members: 480, city: 'Berlin', imageUrl: 'https://picsum.photos/100/100?random=23' },
      { id: 9, title: 'Tokyo Racers', members: 600, city: 'Tokyo', imageUrl: 'https://picsum.photos/100/100?random=24' },
      { id: 10, title: 'Seoul Dashers', members: 570, city: 'Seoul', imageUrl: 'https://picsum.photos/100/100?random=25' },
    ],
    events: [
      { id: 1, title: 'NYC Marathon', participants: 50000, date: '2023-11-05', imageUrl: 'https://picsum.photos/100/100?random=11' },
      { id: 2, title: 'LA 10K', participants: 10000, date: '2023-09-15', imageUrl: 'https://picsum.photos/100/100?random=12' },
      { id: 3, title: 'Chicago Half Marathon', participants: 25000, date: '2023-10-08', imageUrl: 'https://picsum.photos/100/100?random=13' },
      { id: 4, title: 'Houston 5K Fun Run', participants: 5000, date: '2023-08-20', imageUrl: 'https://picsum.photos/100/100?random=14' },
      { id: 5, title: 'Phoenix Trail Run', participants: 2000, date: '2023-12-03', imageUrl: 'https://picsum.photos/100/100?random=15' },
      { id: 6, title: 'London Marathon', participants: 45000, date: '2023-04-23', imageUrl: 'https://picsum.photos/100/100?random=26' },
      { id: 7, title: 'Paris Half Marathon', participants: 30000, date: '2023-03-05', imageUrl: 'https://picsum.photos/100/100?random=27' },
      { id: 8, title: 'Berlin Marathon', participants: 40000, date: '2023-09-24', imageUrl: 'https://picsum.photos/100/100?random=28' },
      { id: 9, title: 'Tokyo Marathon', participants: 38000, date: '2024-03-03', imageUrl: 'https://picsum.photos/100/100?random=29' },
      { id: 10, title: 'Seoul Marathon', participants: 35000, date: '2023-11-19', imageUrl: 'https://picsum.photos/100/100?random=30' },
    ],
  };

  const categoryItems = items[category] || [];

  return (
    <Container fluid className={styles.cardGridContainer}>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className={styles.cardGrid}>
        {categoryItems.map((item) => (
          <Col key={item.id} className={styles.cardColumn}>
            <Card className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <img src={item.imageUrl} alt={item.title} className={styles.cardImage} />
                  <div className={styles.cardTitleContainer}>
                    <Card.Title className={styles.cardTitle}>{item.title}</Card.Title>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  {category === 'cities' && (
                    <>
                      <Card.Text className={styles.cardText}>Clubs: {item.clubs}</Card.Text>
                      <Card.Text className={styles.cardText}>Events: {item.events}</Card.Text>
                      <Card.Text className={styles.cardText}>Runners: {item.runners}</Card.Text>
                    </>
                  )}
                  {category === 'clubs' && (
                    <>
                      <Card.Text className={styles.cardText}>City: {item.city}</Card.Text>
                      <Card.Text className={styles.cardText}>Members: {item.members}</Card.Text>
                    </>
                  )}
                  {category === 'events' && (
                    <>
                      <Card.Text className={styles.cardText}>Date: {item.date}</Card.Text>
                      <Card.Text className={styles.cardText}>Participants: {item.participants}</Card.Text>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardGrid;