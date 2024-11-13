import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt } from 'react-icons/fa';
import styles from '../styles/RunUpWall.module.css';

const RunUpWall = ({ runUp }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, author: 'Current User', timestamp: new Date() }]);
      setNewComment('');
    }
  };

  return (
    <div className={styles.runUpWallWrapper}>
      <Card className={styles.runUpWallCard}>
        <Card.Header className={styles.cardHeader}>
          <h3>{runUp.distance} RunUp</h3>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <div className={styles.runUpDetails}>
            <p><FaMapMarkerAlt /> {runUp.location}</p>
            <p><FaClock /> {new Date(runUp.startTime).toLocaleString()}</p>
            <p><FaRoad /> Distance: {runUp.distance}</p>
            <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
            <p>Hosted by: {runUp.host}</p>
          </div>
          <div className={styles.commentsSection}>
            <h4>Comments</h4>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <p>{comment.text}</p>
                <small>{comment.author} - {comment.timestamp.toLocaleString()}</small>
              </div>
            ))}
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3" controlId="formComment">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Post Comment
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RunUpWall;