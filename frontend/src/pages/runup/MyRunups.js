import React, { useState, useEffect, useCallback } from 'react';
import { Card, Tab, Nav, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/MyRunups.module.css';

const MyRunups = () => {
  const currentUser = useCurrentUser();
  const [hostedRunups, setHostedRunups] = useState([]);
  const [joinedRunups, setJoinedRunups] = useState([]);
  const [error, setError] = useState('');

  const fetchRunups = useCallback(async () => {
    try {
      const { data } = await axiosReq.get('/api/runups/');
      const hosted = data.results.filter(runup => runup.host.id === currentUser?.id);
      const joined = data.results.filter(runup => runup.is_joined);
      setHostedRunups(hosted);
      setJoinedRunups(joined);
    } catch (err) {
      setError('Failed to fetch runups. Please try again.');
    }
  }, [currentUser]);

  useEffect(() => {
    fetchRunups();
  }, [fetchRunups]);

  const handleJoinLeaveRunup = async (runupId, action) => {
    try {
      await axiosReq.post(`/api/runups/${runupId}/${action}/`);
      fetchRunups();
    } catch (err) {
      setError(`Failed to ${action} runup. Please try again.`);
    }
  };

  const RunupCard = ({ runup, isHosted }) => (
    <Card className={styles.runupCard}>
      <Card.Body>
        <Card.Title>{runup.distance}km RunUp</Card.Title>
        <Card.Text>
          <strong>Time:</strong> {new Date(runup.date_time).toLocaleString()}<br />
          <strong>Location:</strong> {runup.location}<br />
          <strong>Pace:</strong> {runup.pace}
        </Card.Text>
        <Link to={`/runup/${runup.id}`} className={styles.viewButton}>
          View Details
        </Link>
        {!isHosted && (
          <Button
            variant={runup.is_joined ? "danger" : "success"}
            onClick={() => handleJoinLeaveRunup(runup.id, runup.is_joined ? 'leave' : 'join')}
            className={styles.joinLeaveButton}
          >
            {runup.is_joined ? 'Leave' : 'Join'} RunUp
          </Button>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <Card className={styles.myRunupsCard}>
      <Card.Header>My RunUps</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Tab.Container defaultActiveKey="hosted">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="hosted">Hosted RunUps</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="joined">Joined RunUps</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history" disabled>RunUps History</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="hosted">
              {hostedRunups.map(runup => (
                <RunupCard key={runup.id} runup={runup} isHosted={true} />
              ))}
            </Tab.Pane>
            <Tab.Pane eventKey="joined">
              {joinedRunups.map(runup => (
                <RunupCard key={runup.id} runup={runup} isHosted={false} />
              ))}
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <p>RunUps history will be available soon.</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default MyRunups;