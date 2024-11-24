import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import styles from '../../styles/EditProfileForm.module.css';

const EditProfileForm = ({ userProfile, onCancel, onProfileUpdated }) => {
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [imageFile, setImageFile] = useState(null);
  const { updateProfile, updateError } = useProfileUpdate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { ...editedProfile };
    if (imageFile) {
      updatedProfile.image = imageFile;
    }
    const { success, data } = await updateProfile(userProfile.id, updatedProfile);
    if (success) {
      onProfileUpdated(data);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Edit Profile</h2>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Profile Image</Form.Label>
          <div className={styles.imagePreviewContainer}>
            <Image 
              src={imageFile ? URL.createObjectURL(imageFile) : userProfile.image || "/placeholder.svg?height=150&width=150"} 
              alt="Profile preview" 
              className={styles.imagePreview} 
              roundedCircle
            />
          </div>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={editedProfile.bio || ''}
            onChange={handleChange}
            className={styles.formControl}
            placeholder="Tell us about yourself"
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={editedProfile.location || ''}
            onChange={handleChange}
            className={styles.formControl}
            placeholder="Your location"
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={editedProfile.city || ''}
            onChange={handleChange}
            className={styles.formControl}
            placeholder="Your city"
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Running Level</Form.Label>
          <Form.Control
            as="select"
            name="running_level"
            value={editedProfile.running_level || ''}
            onChange={handleChange}
            className={styles.formControl}
          >
            <option value="">Select a level</option>
            <option value="1">Novice</option>
            <option value="2">Beginner</option>
            <option value="3">Intermediate</option>
            <option value="4">Advanced</option>
            <option value="5">Professional</option>
          </Form.Control>
        </Form.Group>
        {updateError && <p className={styles.invalidFeedback}>{updateError}</p>}
        <div className={styles.buttonGroup}>
          <Button type="submit" className={styles.submitButton}>Save Changes</Button>
          <Button variant="secondary" onClick={onCancel} className={styles.cancelButton}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfileForm;