import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaPlus, FaUser } from 'react-icons/fa';
import styles from '../../styles/RunUpsPage.module.css';
import ProfileSideMenu from '../profile/ProfileSideMenu';

const RunUpsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [runUps, setRunUps] = useState([
    { id: 1, distance: '5km', pace: '5:30 /km', location: 'Golden Gate Park', startTime: '2023-05-15T07:00:00', host: 'John Doe', participants: 3 },
    { id: 2, distance: '10km', pace: '6:00 /km', location: 'Embarcadero', startTime: '2023-05-16T18:30:00', host: 'Jane Smith', participants: 5 },
    { id: 3, distance: '15km', pace: '5:45 /km', location: 'Presidio', startTime: '2023-05-17T06:30:00', host: 'Mike Johnson', participants: 2 },
    { id: 4, distance: '8km', pace: '5:15 /km', location: 'Marina Green', startTime: '2023-05-18T19:00:00', host: 'Emily Brown', participants: 4 },
    { id: 5, distance: '12km', pace: '5:50 /km', location: 'Lands End', startTime: '2023-05-19T08:00:00', host: 'David Wilson', participants: 6 },
  ]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRunUp = {
      id: runUps.length + 1,
      distance: event.target.formDistance.value,
      pace: event.target.formPace.value,
      location: event.target.formLocation.value,
      startTime: event.target.formStartTime.value,
      host: 'Current User',
      participants: 1,
    };
    setRunUps([newRunUp, ...runUps]);
    handleClose();
  };

  return (
    <Container fluid className={styles.runUpsContainer}>
      <Row>
        <Col md={2} className={styles.sidebarColumn}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContent}>
          <h1 className={styles.pageTitle}>RunUps in Your City</h1>
          <Button variant="primary" onClick={handleShow} className={styles.hostButton}>
            <FaPlus /> Host RunUp
          </Button>
          <div className={styles.runUpsList}>
            {runUps.map((runUp) => (
              <Link key={runUp.id} to={`/runup/${runUp.id}`} className={styles.runUpLink}>
                <div className={styles.runUpItem}>
                  <div className={styles.runUpDetails}>
                    <h3>{runUp.distance} RunUp</h3>
                    <div className={styles.detailsRow}>
                      <p><FaMapMarkerAlt /> {runUp.location}</p>
                      <p><FaClock /> {new Date(runUp.startTime).toLocaleString()}</p>
                    </div>
                    <div className={styles.detailsRow}>
                      <p><FaRoad /> Distance: {runUp.distance}</p>
                      <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
                    </div>
                    <div className={styles.detailsRow}>
                      <p><FaUser /> Host: {runUp.host}</p>
                      <p>{runUp.participants} participants</p>
                    </div>
                  </div>
                  <Button variant="success" className={styles.joinButton}>Join</Button>
                </div>
              </Link>
            ))}
          </div>
        </Col>
      </Row>

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
    </Container>
  );
};

export default RunUpsPage;