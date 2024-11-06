import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/SignInUpForm.module.css';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password1) newErrors.password1 = 'Password is required';
    if (password1 !== password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post('/dj-rest-auth/registration/', signUpData);
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
            value={username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password1" className={styles.formGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            value={password1}
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
            value={password2}
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