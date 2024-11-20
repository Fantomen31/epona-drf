import React from 'react';
import { Card, Tab, Nav, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRunups } from '../../hooks/useRunups';
import styles from '../../styles/MyRunups.module.css';

const MyRunups = () => {
  const currentUser = useCurrentUser();
  const { runups, loading, error, handleJoinLeaveRunup, formatDate } = useRunups();

  console.log('Current user:', currentUser);
  console.log('All runups:', runups);

  const hostedRunups = runups.filter(runup => runup.host.username === currentUser?.username);
  const joinedRunups = runups.filter(runup => runup.is_joined && runup.host.id !== currentUser?.id);

  console.log('Hosted runups:', hostedRunups);
  console.log('Joined runups:', joinedRunups);

  const RunupCard = ({ runup, isHosted }) => (
    <Card className={styles.runupCard}>
      <Card.Body>
        <Card.Title>{runup.distance}km RunUp</Card.Title>
        <Card.Text>
          <strong>Time:</strong> {formatDate(runup.date_time)}<br />
          <strong>Location:</strong> {runup.location}<br />
          <strong>Pace:</strong> {runup.pace}<br />
          <strong>Host:</strong> {runup.host.username}
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

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card className={styles.myRunupsCard}>
      <Card.Header>My RunUps</Card.Header>
      <Card.Body>
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
              {hostedRunups.length > 0 ? (
                hostedRunups.map(runup => (
                  <RunupCard key={runup.id} runup={runup} isHosted={true} />
                ))
              ) : (
                <p>You haven't hosted any RunUps yet. (Current username: {currentUser?.username})</p>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="joined">
              {joinedRunups.length > 0 ? (
                joinedRunups.map(runup => (
                  <RunupCard key={runup.id} runup={runup} isHosted={false} />
                ))
              ) : (
                <p>You haven't joined any RunUps yet.</p>
              )}
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