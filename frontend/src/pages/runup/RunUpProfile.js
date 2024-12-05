import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRoad, FaTachometerAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import ProfileSideMenu from '../profile/ProfileSideMenu';
import styles from '../../styles/RunUpProfile.module.css';
import { useRunups } from '../../hooks/useRunups';
import { useRunupActions } from '../../hooks/useRunupActions';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import HostRunupModal from '../../pages/runup/HostRunupModal';
import Comments from '../../components/Comments';

const RunUpProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { formatDate, fetchRunups } = useRunups();
  const { handleJoinLeaveRunup, handleDeleteRunup, handleEditRunup } = useRunupActions();
  const [runUp, setRunUp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchRunUp = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/api/runups/${id}/`);
      setRunUp(data);
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

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateRunup = async (updatedData) => {
    const result = await handleEditRunup(id, updatedData);
    if (result.success) {
      fetchRunUp();
      setShowEditModal(false);
    } else {
      setError(result.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this RunUp?')) {
      const result = await handleDeleteRunup(id);
      if (result.success) {
        await fetchRunups();
        navigate('/runups');
      } else {
        setError(result.message);
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

  const isHost = currentUser && runUp.host && currentUser.pk === runUp.host.id;

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
              <div className={styles.descriptionSection}>
                <h3> Description</h3>
                <p>{runUp.description || 'No description provided.'}</p>
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
                < Comments runupId={id} />
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.mapPlaceholder}>
                Map placeholder
              </div>
              <div className={styles.actionSection}>
                {isHost ? (
                  <>
                    <Button 
                      variant="warning" 
                      onClick={handleEdit} 
                      className={styles.editButton}
                    >
                      <FaEdit /> Edit RunUp
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={handleDelete} 
                      className={styles.deleteButton}
                    >
                      <FaTrash /> Delete RunUp
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant={runUp.is_joined ? "danger" : "success"} 
                    onClick={handleJoinLeave} 
                    className={styles.joinButton}
                  >
                    {runUp.is_joined ? 'Leave RunUp' : 'Join RunUp'}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <HostRunupModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        onRunupCreated={handleUpdateRunup}
        isEditing={true}
        initialData={runUp}
      />
    </Container>
  );
};

export default RunUpProfile;