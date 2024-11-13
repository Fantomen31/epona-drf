import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaPlus } from 'react-icons/fa';
import styles from '../../styles/RunUps.module.css';

const RunUps = () => {
  const [showModal, setShowModal] = useState(false);
  // Placeholder data for RunUps
  const runUps = [
    { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-05-15T07:00:00' },
    { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-05-16T18:30:00' },
    { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-05-17T06:30:00' },
    { id: 4, distance: '8km', pace: '5:15 /km', location: 'Marina Green', startTime: '2023-05-18T19:00:00' },
    { id: 5, distance: '12km', pace: '5:50 /km', location: 'Lands End', startTime: '2023-05-19T08:00:00' },
  ];
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    handleClose();
  };
  return (
    <div className={styles.runUpsWrapper}>
      <Card className={styles.runUpsCard}>
        <Card.Header className={styles.cardHeader}>
          <h3>RunUps</h3>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.runUpsList}>
            {runUps.map((runUp) => (
              <Link key={runUp.id} to={`/runup/${runUp.id}`} className={styles.runUpLink}>
                <div className={styles.runUpItem}>
                  <div className={styles.runUpDetails}>
                    <h4>{runUp.distance} RunUp</h4>
                    <p><FaMapMarkerAlt /> {runUp.location}</p>
                    <p><FaClock /> {new Date(runUp.startTime).toLocaleString()}</p>
                    <p><FaRoad /> Distance: {runUp.distance}</p>
                    <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
                  </div>
                  <Button variant="success" className={styles.joinButton}>Join Run</Button>
                </div>
              </Link>
            ))}
          </div>
        </Card.Body>
        <Card.Footer className={styles.cardFooter}>
          <Button variant="primary" onClick={handleShow} className={styles.hostButton}>
            <FaPlus /> Host RunUp
          </Button>
        </Card.Footer>
      </Card>
      <Modal show={showModal} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Host a RunUp</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDistance">
              <Form.Label>Distance</Form.Label>
              <Form.Control type="text" placeholder="Enter distance (e.g., 5km)" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPace">
              <Form.Label>Pace</Form.Label>
              <Form.Control type="text" placeholder="Enter pace (e.g., 5:30 /km)" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Starting Location</Form.Label>
              <Form.Control type="text" placeholder="Enter starting location" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" required />
            </Form.Group>
            <Button variant="success" type="submit" className={styles.submitButton}>
              Create RunUp
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RunUps;