import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardGrid from './CardGrid';
import styles from '../styles/MainContent.module.css';
import styles2 from '../App.module.css'
import SearchBar from './SearchBar';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('cities');

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <div className={styles2.content}>
    <Container fluid >
      <Row>
        <Col md={6}>
          <Tabs 
          defaultActiveKey="cities" 
          onSelect={handleSelect} 
          className={styles.customNav}
          >
            <Tab 
            eventKey="cities" 
            title={<><FontAwesomeIcon icon="city" /> Cities</>}
            >
            </Tab>

            <Tab 
            eventKey="clubs" 
            title={<><FontAwesomeIcon icon="users" /> Clubs</>}
            >
            </Tab>

            <Tab 
            eventKey="events" 
            title={<><FontAwesomeIcon icon="flag" /> Events</>}
            >
            </Tab>
          </Tabs>
        </Col>

        <Col md={6}>
        <Container>
          <SearchBar className={styles.searchBar} />
        </Container>
        </Col>
        </Row>
       
        <Col md={12}>
          <CardGrid category={activeTab} />
        </Col>
      
    </Container>
    </div>
  );
};

export default MainContent;