import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from '../styles/HostRunUpModal.module.css';

const HostRunUpModal = ({ show, onHide }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('RunUp hosted');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} className={styles.modal}>
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
  );
};

export default HostRunUpModal;