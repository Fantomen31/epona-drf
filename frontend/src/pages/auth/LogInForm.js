import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/SignInUpForm.module.css';

const LogInForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = loginData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post('/dj-rest-auth/login/', loginData);
        console.log('Login successful:', response.data);
        // Handle successful login (e.g., store token, redirect)
        navigate('/'); // Redirect to home page or dashboard
      } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
        setErrors(err.response?.data || { non_field_errors: ['Invalid username or password.'] });
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Log In</h2>
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

        <Form.Group controlId="password" className={styles.formGroup}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className={styles.submitButton}>
          Log In
        </Button>
      </Form>
      <p className={styles.signupLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LogInForm;