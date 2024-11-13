import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import styles from '../../styles/RunUpProfilePage.module.css';

const RunUpProfilePage = () => {
  const { id } = useParams();
  const [runUp, setRunUp] = useState({
    id: 1,
    distance: '5km',
    pace: '5:30 /km',
    location: 'Golden Gate Park',
    startTime: '2023-05-15T07:00:00',
    host: 'John Doe',
    participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    comments: [
      { id: 1, user: 'Jane Smith', text: 'Looking forward to this run!', timestamp: '2023-05-14T10:30:00' },
      { id: 2, user: 'Mike Johnson', text: 'Great route choice!', timestamp: '2023-05-14T11:45:00' },
    ],
  });

  const [newComment, setNewComment] = useState('');

  const handleJoin = () => {
    setRunUp(prevRunUp => ({
      ...prevRunUp,
      participants: [...prevRunUp.participants, 'Current User'],
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: runUp.comments.length + 1,
      user: 'Current User',
      text: newComment,
      timestamp: new Date().toISOString(),
    };
    setRunUp(prevRunUp => ({
      ...prevRunUp,
      comments: [...prevRunUp.comments, comment],
    }));
    setNewComment('');
  };

  return (
    <Container className={styles.runUpProfileContainer}>
      <h1 className={styles.runUpTitle}>{runUp.distance} RunUp</h1>
      <Row>
        <Col md={8}>
          <div className={styles.runUpDetails}>
            <p><FaMapMarkerAlt /> Location: {runUp.location}</p>
            <p><FaClock /> Start Time: {new Date(runUp.startTime).toLocaleString()}</p>
            <p><FaRoad /> Distance: {runUp.distance}</p>
            <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
            <p><FaUser /> Host: {runUp.host}</p>
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
                  <p className={styles.commentTimestamp}>{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <Form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <Form.Group controlId="newComment">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
              </Form.Group>
              <Button type="submit" variant="primary">Post Comment</Button>
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
        </Col>
      </Row>
    </Container>
  );
};

export default RunUpProfilePage;