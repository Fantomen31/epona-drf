import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import styles from '../../styles/RunUpProfile.module.css';

const RunUpProfile = () => {
  const { id } = useParams();
  const [runUp, setRunUp] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch RunUp details from API or use mock data
    const fetchedRunUp = {
      id: 1,
      distance: '5km',
      pace: '5:30 /km',
      location: 'Golden Gate Park',
      startTime: '2023-11-13T17:00:00',
      host: 'John Doe',
      participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      comments: [
        { id: 1, user: 'Jane Smith', text: 'Looking forward to this run!', timestamp: '2023-11-12T10:30:00' },
        { id: 2, user: 'Mike Johnson', text: 'Great route choice!', timestamp: '2023-11-12T11:45:00' },
      ],
    };
    setRunUp(fetchedRunUp);
  }, [id]);

  const handleJoin = () => {
    // Implement join logic here
    console.log('Joined RunUp');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: runUp.comments.length + 1,
        user: 'Current User', // Replace with actual user name
        text: comment,
        timestamp: new Date().toISOString(),
      };
      setRunUp(prevRunUp => ({
        ...prevRunUp,
        comments: [...prevRunUp.comments, newComment],
      }));
      setComment('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!runUp) return <div>Loading...</div>;

  return (
    <Container fluid className={styles.runUpProfileContainer}>
      <Row>
        <Col md={2}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContentColumn}>
          <h1 className={styles.runUpTitle}>{runUp.distance} RunUp</h1>
          <Row>
            <Col md={8}>
              <div className={styles.runUpDetails}>
                <p><FaUser /> Host: {runUp.host}</p>
                <p><FaMapMarkerAlt /> Location: {runUp.location}</p>
                <p><FaClock /> Start Time: {formatDate(runUp.startTime)}</p>
                <p><FaRoad /> Distance: {runUp.distance}</p>
                <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
              </div>
              <div className={styles.participantsSection}>
                <h3>Participants ({runUp.participants.length})</h3>
                <ul className={styles.participantsList}>
                  {runUp.participants.map((participant, index) => (
                    <li key={index}>{participant}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.commentsSection}>
                <h3>Comments</h3>
                <div className={styles.commentsList}>
                  {runUp.comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                      <p className={styles.commentUser}>{comment.user}</p>
                      <p className={styles.commentText}>{comment.text}</p>
                      <p className={styles.commentTimestamp}>{formatDate(comment.timestamp)}</p>
                    </div>
                  ))}
                </div>
                <Form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                  <Form.Group controlId="newComment">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className={styles.submitButton}>Post Comment</Button>
                </Form>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.actionSection}>
                <Button variant="success" onClick={handleJoin} className={styles.joinButton}>
                  Join RunUp
                </Button>
              </div>
              {/* Add a map component here to show the run route */}
              <div className={styles.mapPlaceholder}>
                Map placeholder
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RunUpProfile;