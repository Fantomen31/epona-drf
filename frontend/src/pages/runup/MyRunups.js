import React, { useState, useCallback } from 'react';
import { Card, Tab, Nav, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useRunups } from '../../hooks/useRunups';
import { useRunupActions } from '../../hooks/useRunupActions';
import styles from '../../styles/MyRunups.module.css';
import { FaRunning, FaMapMarkerAlt, FaClock, FaUser, FaPlus } from 'react-icons/fa';
import HostRunupModal from './HostRunupModal';

const MyRunups = ({ inProfilePage = false }) => {
  const currentUser = useCurrentUser();
  const { runups, loading, error, hasMore, loadMore, formatDate, cities, createRunup, handleHostRunup } = useRunups();
  const { handleJoinLeaveRunup, handleDeleteRunup } = useRunupActions(() => loadMore());
  const [activeTab, setActiveTab] = useState('hosted');
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = useCallback(async () => {
    const canHost = await handleHostRunup();
    if (canHost) {
      setShowModal(true);
    }
  }, [handleHostRunup]);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleRunupCreated = useCallback(async (newRunupData) => {
    const result = await createRunup(newRunupData);
    if (result.success) {
      handleCloseModal();
      loadMore(1); // Refresh the runups list
    } else {
      console.error(result.message);
    }
  }, [createRunup, handleCloseModal, loadMore]);

  const hostedRunups = runups.filter(runup => runup.host.username === currentUser?.username);
  const joinedRunups = runups.filter(runup => runup.is_joined && runup.host.id !== currentUser?.id);

  const RunupCard = ({ runup, isHosted }) => (
    <div className={styles.runUpItem}>
      <div className={styles.runUpDetails}>
        <div className={styles.runUpHeader}>
          <h4>{runup.distance}km RunUp</h4>
          <div className={styles.hostInfo}>
            <FaUser className={styles.infoIcon} />
            <span>{runup.host.username}</span>
          </div>
        </div>
        <div className={styles.runUpInfo}>
          <p><FaClock className={styles.infoIcon} /> {formatDate(runup.date_time)}</p>
          <p><FaMapMarkerAlt className={styles.infoIcon} /> {runup.location}</p>
          <p><FaRunning className={styles.infoIcon} /> {runup.pace}</p>
        </div>
      </div>
      <div className={styles.actionButtons}>
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
        {isHosted && (
          <Button
            variant="danger"
            onClick={() => handleDeleteRunup(runup.id)}
            className={styles.deleteButton}
          >
            Delete RunUp
          </Button>
        )}
      </div>
    </div>
  );

  const renderRunups = (runupsToRender, isHosted) => (
    <InfiniteScroll
      dataLength={runupsToRender.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Spinner animation="border" role="status" className={styles.spinner} />}
      endMessage={<p className={styles.endMessage}>No more runups to load.</p>}
      className={`${styles.runUpsList} ${inProfilePage ? styles.profilePageRunUpsList : ''}`}
      height={inProfilePage ? undefined : 200}
    >
      {runupsToRender.map(runup => (
        <RunupCard key={runup.id} runup={runup} isHosted={isHosted} />
      ))}
    </InfiniteScroll>
  );

  if (loading && runups.length === 0) {
    return <Spinner animation="border" role="status" className={styles.spinner} />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className={`${styles.myRunupsContainer} ${inProfilePage ? styles.profilePageContainer : ''}`}>
      <Card className={`${styles.myRunupsCard} ${inProfilePage ? styles.profilePageCard : ''}`}>
        <Card.Header className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <h3>My RunUps</h3>
            {inProfilePage && (
              <Button variant="success" className={styles.hostButton} onClick={handleOpenModal}>
                <FaPlus /> Host RunUp
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body className={`${styles.cardBody} ${inProfilePage ? styles.profilePageCardBody : ''}`}>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="tabs" className={`${styles.tabNav} ${inProfilePage ? styles.profilePageTabNav : ''}`}>
              <Nav.Item>
                <Nav.Link eventKey="hosted" className={styles.tabLink}>Hosted</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="joined" className={styles.tabLink}>Joined</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history" disabled className={styles.tabLink}>History</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className={`${styles.tabContent} ${inProfilePage ? styles.profilePageTabContent : ''}`}>
              <Tab.Pane eventKey="hosted">
                {hostedRunups.length > 0 ? (
                  renderRunups(hostedRunups, true)
                ) : (
                  <p className={styles.noRunupsMessage}>You haven't hosted any RunUps yet.</p>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="joined">
                {joinedRunups.length > 0 ? (
                  renderRunups(joinedRunups, false)
                ) : (
                  <p className={styles.noRunupsMessage}>You haven't joined any RunUps yet.</p>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <p className={styles.noRunupsMessage}>RunUps history will be available soon.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
      {showModal && (
        <HostRunupModal 
          show={showModal} 
          handleClose={handleCloseModal} 
          onRunupCreated={handleRunupCreated}
          cities={cities}
        />
      )}
    </div>
  );
};

export default MyRunups;