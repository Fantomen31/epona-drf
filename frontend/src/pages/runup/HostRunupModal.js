import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useRunups } from '../../hooks/useRunups';
import styles from '../../styles/HostRunupModal.module.css';

const HostRunupModal = ({ show, handleClose, onRunupCreated = () => {} }) => {
  const [runupData, setRunupData] = useState({
    description: '',
    location: '',
    date: '',
    time: '',
    city: '',
    distance: '',
    pace: '',
    duration: '',
    privacy: 'public' 
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { cities, createRunup } = useRunups();

  useEffect(() => {
    console.log('Cities in HostRunupModal:', cities);
  }, [cities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRunupData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...runupData,
      date_time: `${runupData.date}T${runupData.time}`,
      duration: parseInt(runupData.duration, 10),
      visibility: runupData.privacy === 'public' ? 'OPEN' : 'CLOSED'
    };
    delete formattedData.date;
    delete formattedData.time;
    delete formattedData.privacy;

    const result = await createRunup(formattedData);
    setIsSuccess(result.success);
    setResultMessage(result.message);
    setShowResultModal(true);
    if (result.success) {
      onRunupCreated(result.data);
      handleClose();
    }
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>Host a Runup</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={runupData.description}
                onChange={handleChange}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Location (Address)</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={runupData.location}
                onChange={handleChange}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={runupData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                max={getMaxDate()}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={runupData.time}
                onChange={handleChange}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>City</Form.Label>
              <Form.Select
                name="city"
                value={runupData.city}
                onChange={handleChange}
                required
                className={`${styles.formControl} ${styles.formSelect}`}
              >
                <option value="">Select a city</option>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))
                ) : (
                  <option disabled>No cities available</option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Distance (km)</Form.Label>
              <Form.Control
                type="number"
                name="distance"
                value={runupData.distance}
                onChange={handleChange}
                required
                min={1}
                max={25}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Pace (min:sec per km)</Form.Label>
              <Form.Control
                type="text"
                name="pace"
                value={runupData.pace}
                onChange={handleChange}
                required
                placeholder="e.g., 5:30"
                pattern="\d{1,2}:\d{2}"
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={runupData.duration}
                onChange={handleChange}
                required
                min={1}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Privacy</Form.Label>
              <Form.Select
                name="privacy"
                value={runupData.privacy}
                onChange={handleChange}
                required
                className={`${styles.formControl} ${styles.formSelect}`}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className={styles.submitButton}>
              Create Runup
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isSuccess ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{resultMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResultModal(false)}>
            Close
          </Button>
          {isSuccess && (
            <Button variant="primary" onClick={() => {/* Navigate to My RunUps */}}>
              Go to My RunUps
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HostRunupModal;