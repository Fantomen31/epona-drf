import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styles from '../../styles/RunUpsSearchBar.module.css';

const RunUpsSearchBar = ({ searchTerm, filters, onSearchChange, onFilterChange, onSearch }) => {
  return (
    <Form className={styles.searchAndFilterForm}>
      <Row className="g-2">
        <Col md={4}>
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search by location or host"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={8}>
          <Row className="g-2">
            <Col md={2}>
              <Form.Group controlId="distanceFilter">
                <Form.Select
                  name="distance"
                  value={filters.distance}
                  onChange={onFilterChange}
                >
                  <option value="">Distance</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="21">21 km</option>
                  <option value="42">42 km</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="paceFilter">
                <Form.Control
                  type="text"
                  placeholder="Pace (min/km)"
                  name="pace"
                  value={filters.pace}
                  onChange={onFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="durationFilter">
                <Form.Control
                  type="number"
                  placeholder="Duration (min)"
                  name="duration"
                  value={filters.duration}
                  onChange={onFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="dayOfWeekFilter">
                <Form.Select
                  name="dayOfWeek"
                  value={filters.dayOfWeek}
                  onChange={onFilterChange}
                >
                  <option value="">Day of Week</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="timeFilter">
                <Form.Control
                  type="time"
                  name="time"
                  value={filters.time}
                  onChange={onFilterChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button variant="primary" onClick={onSearch} className={styles.filterButton}>
                <FaSearch /> Search
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default RunUpsSearchBar;