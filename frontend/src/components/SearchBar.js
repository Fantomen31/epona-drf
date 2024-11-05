import React, { useState } from 'react';
import { Form, InputGroup, Button, Container } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <InputGroup className={styles.searchInputGroup}>
      <InputGroup.Text className={styles.searchIcon}>
          <Search size={15} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search for a City, Club or Event"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <Button type="submit" variant="primary" className={styles.searchButton}>
          Search
        </Button>
      </InputGroup>
    </Form>
    </Container>
  );
};

export default SearchBar;