import React, { useState, useRef } from 'react';
import { Form, Button, Image, Alert } from 'react-bootstrap';
import { FaUser, FaTimes } from 'react-icons/fa';
import styles from '../../styles/EditProfileForm.module.css';
import { axiosReq } from '../../api/axiosDefaults';

const EditProfileForm = ({ userProfile, onCancel, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    city: userProfile?.city || '',
    running_level: userProfile?.running_level || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    if (imageFile) {
      formDataToSend.append('profile_image', imageFile);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${userProfile.id}/`, formDataToSend);
      onProfileUpdated(data);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ['An error occurred while updating the profile.'] });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Edit Profile</h2>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className={styles.formGroup}>
          <Form.Label>Current Profile Image</Form.Label>
          <div className={styles.iconWrapper}>
            {userProfile?.profile_image ? (
              <img 
                src={userProfile.profile_image} 
                alt={`${userProfile.user}'s profile`} 
                className={styles.profileImage}
              />
            ) : (
              <FaUser className={styles.profileIcon} aria-label="Default user icon" />
            )}
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>New Profile Image</Form.Label>
          <div className={styles.imagePreviewContainer}>
            <Image 
              src={imageFile ? URL.createObjectURL(imageFile) : userProfile.profile_image || "/placeholder.svg?height=150&width=150"} 
              alt="Profile preview" 
              className={styles.imagePreview} 
              roundedCircle
            />
          </div>
          <div className={styles.fileInputWrapper}>
            <Form.Control 
              type="file" 
              onChange={handleImageChange} 
              accept="image/*"
              className={styles.formControl}
              ref={fileInputRef}
            />
            {imageFile && (
              <Button
                className={styles.removeFileButton}
                onClick={handleRemoveImage}
                aria-label="Remove selected file"
              >
                <FaTimes />
              </Button>
            )}
          </div>
          {errors.profile_image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={styles.formControl}
          />
          {errors.bio?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.formControl}
          />
          {errors.location?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.formControl}
          />
          {errors.city?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Running Level</Form.Label>
          <Form.Control
            as="select"
            name="running_level"
            value={formData.running_level}
            onChange={handleChange}
            className={styles.formControl}
          >
            <option value="">Select a level</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </Form.Control>
          {errors.running_level?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Form.Group>

        <div className={styles.buttonGroup}>
          <Button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" onClick={onCancel} className={styles.cancelButton} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfileForm;