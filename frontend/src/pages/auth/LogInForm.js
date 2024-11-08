import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/SignInUpForm.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';





function LogInForm () {
  const setCurrentUser = useSetCurrentUser();

  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = logInData;

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoginError('');
    } else {
      try {
        const {data} = await axios.post('/dj-rest-auth/login/', logInData);
        setCurrentUser(data.user)
        console.log('Login successful:', data.user);
        navigate('/'); // Redirect to home page or dashboard
      } catch (err) {
        console.error('Login error:', err.response?.data || err.message);
        setErrors({});
        if (err.response && err.response.data) {
          if (err.response.data.non_field_errors) {
            setLoginError(err.response.data.non_field_errors[0]);
          } else if (err.response.data.username) {
            setLoginError(err.response.data.username[0]);
          } else if (err.response.data.password) {
            setLoginError(err.response.data.password[0]);
          } else {
            setLoginError('An unexpected error occurred. Please try again.');
          }
        } else {
          setLoginError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Log In</h2>
      {loginError && (
        <Alert variant="danger">
          {loginError}
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