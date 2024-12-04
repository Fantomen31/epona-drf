import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useRunups } from '../../hooks/useRunups';
import styles from '../../styles/HostRunupModal.module.css';

const HostRunupModal = ({ show, handleClose, onRunupCreated = () => {}, isEditing = false, initialData = null }) => {
  const [runupData, setRunupData] = useState({
    description: '',
    location: '',
    date_time: '',
    city: '',
    distance: '',
    pace: '',
    duration: '',
    privacy: 'public' 
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { cities, createRunup, editRunup } = useRunups();

  useEffect(() => {
    if (isEditing && initialData) {
      const { visibility, ...rest } = initialData;
      setRunupData({
        ...rest,
        date_time: initialData.date_time ? new Date(initialData.date_time).toISOString().slice(0, 16) : '',
        privacy: visibility === 'OPEN' ? 'public' : 'private'
      });
    } else {
      setRunupData({
        description: '',
        location: '',
        date_time: '',
        city: '',
        distance: '',
        pace: '',
        duration: '',
        privacy: 'public'
      });
    }
  }, [isEditing, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRunupData(prevData => ({
      ...prevData,
      [name]: name === 'date_time' ? value.slice(0, 16) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {};
  
    // Only include changed fields
    Object.keys(runupData).forEach(key => {
      if (initialData[key] !== runupData[key]) {
        if (['city', 'distance', 'duration'].includes(key)) {
          formattedData[key] = parseInt(runupData[key], 10);
        } else if (key === 'date_time') {
          formattedData[key] = runupData[key] ? new Date(runupData[key]).toISOString() : undefined;
        } else if (key === 'privacy') {
          formattedData['visibility'] = runupData[key] === 'public' ? 'OPEN' : 'CLOSED';
        } else {
          formattedData[key] = runupData[key];
        }
      }
    });
  
    let result;
    if (isEditing) {
      result = await editRunup(initialData.id, formattedData);
    } else {
      result = await createRunup(formattedData);
    }
  
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
    return date.toISOString().slice(0, 16);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>{isEditing ? 'Edit Runup' : 'Host a Runup'}</Modal.Title>
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
                required={!isEditing}
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
                required={!isEditing}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date_time"
                value={runupData.date_time}
                onChange={handleChange}
                required={!isEditing}
                min={new Date().toISOString().slice(0, 16)}
                max={getMaxDate()}
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>City</Form.Label>
              <Form.Select
                name="city"
                value={runupData.city}
                onChange={handleChange}
                required={!isEditing}
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
                required={!isEditing}
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
                required={!isEditing}
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
                required={!isEditing}
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
                required={!isEditing}
                className={`${styles.formControl} ${styles.formSelect}`}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className={styles.submitButton}>
              {isEditing ? 'Update Runup' : 'Create Runup'}
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