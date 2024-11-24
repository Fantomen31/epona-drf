import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaMapMarkerAlt, FaRunning, FaUsers, FaTrophy } from 'react-icons/fa';
import styles from '../../styles/DetailedProfile.module.css';
import { useProfileData } from '../../hooks/useProfileData';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const DetailedProfile = () => {
  const { profile, setProfile, error } = useProfileData();
  const { updateProfile, updateError } = useProfileUpdate(setProfile);
  const currentUser = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(editedProfile);
    if (success) {
      setIsEditing(false);
    }
  };

  if (error || updateError) {
    return <Alert variant="danger">{error || updateError}</Alert>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  const ProfileContent = () => (
    <>
      <div className={styles.profileHeader}>
        <h2>{profile.user} <span className={styles.username}>@{profile.user}</span></h2>
        {currentUser && currentUser.pk === profile.id && (
          <Button onClick={handleEdit} className={styles.editButton}>
            <FaEdit /> Edit Profile
          </Button>
        )}
      </div>
      <p className={styles.bio}>{profile.bio || 'No bio yet. Click edit to add one!'}</p>
      <div className={styles.profileDetails}>
        <p>
          <FaMapMarkerAlt /> Location: {profile.location || 'Not specified'}
        </p>
        <p>
          <FaRunning /> Running Level: {profile.running_level_display || 'Not specified'}
        </p>
        <p>
          <FaUsers /> Participated Events: {profile.participated_events?.length || 0}
        </p>
      </div>
    </>
  );

  const EditForm = () => (
    <Form onSubmit={handleSubmit}>
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
        <Form.Label>Running Level</Form.Label>
        <Form.Control
          as="select"
          name="running_level"
          value={editedProfile.running_level || ''}
          onChange={handleChange}
        >
          <option value="">Select a level</option>
          <option value="1">Beginner</option>
          <option value="2">Intermediate</option>
          <option value="3">Advanced</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit">Save Changes</Button>
      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
    </Form>
  );

  return (
    <div className={styles.detailedProfile}>
      <Card className={styles.profileCard}>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className={styles.profileImageCol}>
              <img src={profile.image || "/placeholder.svg?height=150&width=150"} alt={profile.user} className={styles.profileImage} />
            </Col>
            <Col xs={12} md={8}>
              {isEditing ? <EditForm /> : <ProfileContent />}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Keep the statistics and achievements sections as placeholders for now */}
      <h3 className={styles.sectionTitle}>Statistics</h3>
      <Row className={styles.statisticsGrid}>
        {/* ... (keep the existing statistics code) */}
      </Row>

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievementsStack}>
        {/* ... (keep the existing achievements code) */}
      </div>
    </div>
  );
};

export default DetailedProfile;