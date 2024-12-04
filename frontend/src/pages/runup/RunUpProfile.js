import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser } from 'react-icons/fa';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import styles from '../../styles/RunUpProfile.module.css';
import { useRunups } from '../../hooks/useRunups';
import { useRunupActions } from '../../hooks/useRunupActions';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const RunUpProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { formatDate } = useRunups();
  const { handleJoinLeaveRunup } = useRunupActions(() => fetchRunUp());
  const [runUp, setRunUp] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRunUp = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/api/runups/${id}/`);
      setRunUp({
        ...data,
        comments: data.comments || [
          { id: 1, owner: 'PlaceholderUser1', content: 'Great RunUp!', created_at: new Date().toISOString() },
          { id: 2, owner: 'PlaceholderUser2', content: 'Looking forward to it!', created_at: new Date().toISOString() }
        ]
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch RunUp details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRunUp();
  }, [fetchRunUp]);

  const handleJoinLeave = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const result = await handleJoinLeaveRunup(id, runUp.is_joined ? 'leave' : 'join');
    if (result.success) {
      fetchRunUp();
    } else {
      setError(result.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (comment.trim()) {
      try {
        await axiosReq.post(`/api/runups/${id}/comments/`, { content: comment });
        fetchRunUp();
        setComment('');
      } catch (err) {
        setError('Failed to post comment. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!runUp) return <Alert variant="warning">RunUp not found.</Alert>;

  return (
    <Container fluid className={styles.runUpProfileContainer}>
      <Row>
        <Col md={2}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContentColumn}>
          <h1 className={styles.runUpTitle}>{runUp.distance}km RunUp</h1>
          <Row>
            <Col md={8}>
              <div className={styles.runUpDetails}>
                <p><FaUser /> Host: {runUp.host.username}</p>
                <p><FaMapMarkerAlt /> Location: {runUp.location}</p>
                <p><FaClock /> Start Time: {formatDate(runUp.date_time)}</p>
                <p><FaRoad /> Distance: {runUp.distance}km</p>
                <p><FaTachometerAlt /> Pace: {runUp.pace}</p>
              </div>
              <div className={styles.participantsSection}>
                <h3>Participants ({runUp.participants.length})</h3>
                <ul className={styles.participantsList}>
                  {runUp.participants.map((participant) => (
                    <li key={participant.id}>{participant.username}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.commentsSection}>
                <h3>Comments</h3>
                <div className={styles.commentsList}>
                  {runUp.comments && runUp.comments.length > 0 ? (
                    runUp.comments.map(comment => (
                      <div key={comment.id} className={styles.comment}>
                        <p className={styles.commentUser}>{comment.owner}</p>
                        <p className={styles.commentText}>{comment.content}</p>
                        <p className={styles.commentTimestamp}>{formatDate(comment.created_at)}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
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
                <Button 
                  variant={runUp.is_joined ? "danger" : "success"} 
                  onClick={handleJoinLeave} 
                  className={styles.joinButton}
                >
                  {runUp.is_joined ? 'Leave RunUp' : 'Join RunUp'}
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