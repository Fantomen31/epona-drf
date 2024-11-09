import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { FaEdit, FaMapMarkerAlt, FaRunning, FaUsers, FaTrophy } from 'react-icons/fa';
import styles from '../../styles/DetailedProfile.module.css';

const DetailedProfile = () => {
  // Placeholder data
  const profile = {
    name: "Jane Runner",
    username: "@janerunner",
    bio: "Passionate runner, always chasing that runner's high!",
    location: "San Francisco",
    heroCity: "New York",
    runningLevel: "Intermediate",
    club: "SF Runners",
    clubsCount: 3,
    followers: 245,
    following: 178,
    profilePicture: "/placeholder.svg?height=150&width=150",
  };

  const statistics = [
    { label: "Total Distance", value: "1,234 km" },
    { label: "Avg. Pace", value: "5:30 /km" },
    { label: "Total Runs", value: "156" },
    { label: "Total Time", value: "120h 45m" },
  ];

  const achievements = [
    { title: "Marathon Finisher", description: "Completed first marathon" },
    { title: "100km Club", description: "Ran 100km in a month" },
    { title: "Early Bird", description: "10 runs before 7am" },
  ];

  return (
    <div className={styles.detailedProfile}>
      <Card className={styles.profileCard}>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className={styles.profileImageCol}>
              <img src={profile.profilePicture} alt={profile.name} className={styles.profileImage} />
            </Col>
            <Col xs={12} md={8}>
              <div className={styles.profileHeader}>
                <h2>{profile.name} <span className={styles.username}>{profile.username}</span></h2>
                <Link to="/edit-profile" className={styles.editButton}>
                  <FaEdit /> Edit Profile
                </Link>
              </div>
              <p className={styles.bio}>{profile.bio}</p>
              <div className={styles.profileDetails}>
                <p>
                  <FaMapMarkerAlt /> Location: <Link to={`/cities/${profile.location}`}>{profile.location}</Link>
                </p>
                <p>
                  <FaMapMarkerAlt /> Hero City: <Link to={`/cities/${profile.heroCity}`}>{profile.heroCity}</Link>
                </p>
                <p>
                  <FaRunning /> Running Level: {profile.runningLevel}
                </p>
                <p>
                  <FaUsers /> Club: <Link to={`/clubs/${profile.club}`}>{profile.club}</Link>
                </p>
              </div>
              <div className={styles.profileStats}>
                <span>{profile.clubsCount} clubs</span>
                <span>{profile.followers} followers</span>
                <span>{profile.following} following</span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h3 className={styles.sectionTitle}>Statistics</h3>
      <Row className={styles.statisticsGrid}>
        {statistics.map((stat, index) => (
          <Col key={index} xs={6} md={3}>
            <Card className={styles.statCard}>
              <Card.Body>
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className={styles.sectionTitle}>Achievements</h3>
      <div className={styles.achievementsStack}>
        {achievements.map((achievement, index) => (
          <Card key={index} className={styles.achievementCard}>
            <Card.Body>
              <h4><FaTrophy className={styles.trophyIcon} /> {achievement.title}</h4>
              <p>{achievement.description}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedProfile;