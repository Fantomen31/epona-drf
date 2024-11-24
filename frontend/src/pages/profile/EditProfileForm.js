import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useProfileUpdate } from '../hooks/useProfileUpdate';
import styles from '../styles/EditProfileForm.module.css';

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
    <Form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <Form.Group>
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="bio"
          value={editedProfile.bio || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={editedProfile.location || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={editedProfile.city || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Running Level</Form.Label>
        <Form.Control
          as="select"
          name="running_level"
          value={editedProfile.running_level || ''}
          onChange={handleChange}
        >
          <option value="">Select a level</option>
          <option value="1">Novice</option>
          <option value="2">Beginner</option>
          <option value="3">Intermediate</option>
          <option value="4">Advanced</option>
          <option value="5">Professional</option>
        </Form.Control>
      </Form.Group>
      {updateError && <p className={styles.errorMessage}>{updateError}</p>}
      <div className={styles.buttonGroup}>
        <Button type="submit" variant="primary">Save Changes</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;