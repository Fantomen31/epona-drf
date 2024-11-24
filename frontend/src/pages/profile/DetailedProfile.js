// components/DetailedProfile.js
import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Alert, Image } from 'react-bootstrap';
import { FaEdit, FaMapMarkerAlt, FaRunning, FaUsers, FaTrophy, FaCity } from 'react-icons/fa';
import styles from '../styles/DetailedProfile.module.css';
import { useUserProfile } from '../hooks/useUserProfile';
import { useProfileUpdate } from '../hooks/useProfileUpdate';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const DetailedProfile = () => {
  const { userProfile, refreshUserProfile } = useUserProfile();
  const { updateProfile, updateError } = useProfileUpdate();
  const currentUser = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
  };

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
    const { success } = await updateProfile(userProfile.id, updatedProfile);
    if (success) {
      setIsEditing(false);
      setImageFile(null);
      refreshUserProfile();
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const ProfileContent = () => (
    <>
      <div className={styles.profileHeader}>
        <h2>{userProfile.user} <span className={styles.username}>@{userProfile.user}</span></h2>
        {currentUser && currentUser.profile_id === userProfile.id && (
          <Button onClick={handleEdit} className={styles.editButton}>
            <FaEdit /> Edit Profile
          </Button>
        )}
      </div>
      <p className={styles.bio}>{userProfile.bio || 'No bio yet. Click edit to add one!'}</p>
      <div className={styles.profileDetails}>
        <p>
          <FaMapMarkerAlt /> Location: {userProfile.location || 'Not specified'}
        </p>
        <p>
          <FaCity /> City: {userProfile.city || 'Not specified'}
        </p>
        <p>
          <FaRunning /> Running Level: {userProfile.running_level_display || 'Not specified'}
        </p>
        <p>
          <FaUsers /> Participated Events: {userProfile.participated_events?.length || 0}
        </p>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <span>{userProfile.followers_count || 0} Followers</span>
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.following_count || 0} Following</span>
        </div>
        <div className={styles.statItem}>
          <span>{userProfile.clubs_count || 0} Clubs</span>
        </div>
      </div>
    </>
  );

  const EditForm = () => (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Profile Image</Form.Label>
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
              <Image 
                src={userProfile.image || "/placeholder.svg?height=150&width=150"} 
                alt={userProfile.user} 
                className={styles.profileImage} 
                roundedCircle
              />
            </Col>
            <Col xs={12} md={8}>
              {isEditing ? <EditForm /> : <ProfileContent />}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h3 className={styles.sectionTitle}>Statistics</h3>
      <Row className={styles.statisticsGrid}>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>1,234 km</h4>
              <p>Total Distance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>5:30 /km</h4>
              <p>Avg. Pace</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>156</h4>
              <p>Total Runs</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className={styles.statCard}>
            <Card.Body>
              <h4>120h 45m</h4>
              <p>Total Time</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievementsStack}>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> Marathon Finisher</h4>
            <p>Completed first marathon</p>
          </Card.Body>
        </Card>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> 100km Club</h4>
            <p>Ran 100km in a month</p>
          </Card.Body>
        </Card>
        <Card className={styles.achievementCard}>
          <Card.Body>
            <h4><FaTrophy className={styles.trophyIcon} /> Early Bird</h4>
            <p>10 runs before 7am</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DetailedProfile;