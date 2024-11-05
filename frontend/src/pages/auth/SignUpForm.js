import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/SignInUpForm.module.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password1) newErrors.password1 = 'Password is required';
    if (formData.password1 !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const url = `${process.env.REACT_APP_API_URL}/dj-rest-auth/registration/`;
        console.log('Submitting to:', url);
        const response = await axios.post(url, formData);
        console.log('Registration successful:', response.data);
        navigate('/login');
      } catch (err) {
        console.error('Registration error:', err.response?.data || err.message);
        setErrors(err.response?.data || { non_field_errors: ['An unexpected error occurred.'] });
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      {errors.non_field_errors && (
        <Alert variant="danger">
          {errors.non_field_errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group controlId="username" className={styles.formGroup}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email" className={styles.formGroup}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password1" className={styles.formGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            isInvalid={!!errors.password1}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password2" className={styles.formGroup}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            isInvalid={!!errors.password2}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className={styles.submitButton}>
          Sign Up
        </Button>
      </Form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUpForm;