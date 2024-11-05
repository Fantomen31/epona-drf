import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../styles/SignInUpForm.module.css';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form validation logic here
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // If no errors, you can proceed with form submission
      console.log('Form submitted:', formData);
      // Add your API call or other logic here
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Log In</h2>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group controlId="email" className={styles.formGroup}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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