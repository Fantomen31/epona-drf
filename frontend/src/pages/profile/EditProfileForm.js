import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Image, Alert } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import styles from '../../styles/EditProfileForm.module.css';
import { axiosReq, setRequestConfig } from '../../api/axiosDefaults';

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
  const [cities, setCities] = useState([]);
  const fileInputRef = useRef(null);

  console.log('CITY: ', formData.city)
  console.log('bio: ', formData.bio)
  console.log('location: ', formData.location)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axiosReq.get('/api/cities/');
        setCities(data.results); 
      } catch (err) {
        console.error('Error fetching cities:', err);
        setErrors(prevErrors => ({ ...prevErrors, cities: ['Failed to load cities. Please try again.'] }));
      }
    };
    fetchCities();
  }, []);

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

    let dataToSend;
    let config;

    if (imageFile) {
      dataToSend = new FormData();
      dataToSend.append('bio', formData.bio);
      dataToSend.append('location', formData.location);
      dataToSend.append('running_level', parseInt(formData.running_level, 10));
      dataToSend.append('image', imageFile);
      dataToSend.append('city', formData.city);
    } else {
      dataToSend = {
        bio: formData.bio,
        location: formData.location,
        running_level: parseInt(formData.running_level),
        city: formData.city,
      };
    }

    config = setRequestConfig(dataToSend);

    try {
      const { data } = await axiosReq.put(`/api/profiles/${userProfile.id}/`, dataToSend, config);
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
          <Form.Label>Profile Image</Form.Label>
          <div className={styles.imagePreviewContainer}>
            <Image 
              src={imageFile ? URL.createObjectURL(imageFile) : userProfile.image || "/placeholder.svg?height=150&width=150"} 
              alt="" 
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
          {errors.image?.map((message, idx) => (
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
            as="select"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.formControl}
          >
            {cities.map(city => (
          <option key={city.id} value={city.id}>{city.name}</option>
          ))}
         </Form.Control>
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
            <option value="1">Novice</option>
            <option value="2">Beginner</option>
            <option value="3">Intermediate</option>
            <option value="4">Advanced</option>
            <option value="5">Professional</option>
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