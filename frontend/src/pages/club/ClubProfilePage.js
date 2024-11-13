import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import styles from '../../styles/ClubProfilePage.module.css'
import ProfileSideMenu from '../profile/ProfileSideMenu'
import ClubHeroSection from './ClubHeroSection'
import ClubOverview from './ClubOverview'
import ClubCardGrid from './ClubCardGrid'
import ClubSectionTitle from './ClubSectionTitle'
import ClubMembers from './ClubMembers'
import ClubEvents from './ClubEvents'
import ClubRoutes from './ClubRoutes'
import ClubGroupFeed from './ClubGroupFeed'
import ClubMembershipButton from './ClubMembershipButton'

export default function ClubProfilePage() {
  const clubId = 1; // This would typically come from a route parameter

  return (
    <Container fluid className={styles.clubProfileContainer}>
      <Row>
        <Col md={2} className={styles.sidebarColumn}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContent}>
          <ClubHeroSection
            clubName="San Francisco Road Runners"
            clubStats="1,200 members • 50,000 miles run • Founded in 2010"
            imageUrl="/placeholder.svg?height=400&width=800"
          />
          
          <div className={styles.membershipButtonContainer}>
            <ClubMembershipButton clubId={clubId} />
          </div>

          <Tabs defaultActiveKey="overview" className={`mb-3 ${styles.clubTabs}`}>
            <Tab eventKey="overview" title="Overview">
              <ClubOverview />
              <ClubSectionTitle>Upcoming Events</ClubSectionTitle>
              <ClubCardGrid>
                <ClubEvents limit={2} />
              </ClubCardGrid>
              <ClubSectionTitle>Featured Members</ClubSectionTitle>
              <ClubCardGrid>
                <ClubMembers limit={2} />
              </ClubCardGrid>
              <ClubSectionTitle>Popular Routes</ClubSectionTitle>
              <ClubCardGrid>
                <ClubRoutes limit={2} />
              </ClubCardGrid>
            </Tab>
            <Tab eventKey="members" title="Members">
              <ClubSectionTitle>Club Members</ClubSectionTitle>
              <ClubCardGrid>
                <ClubMembers />
              </ClubCardGrid>
            </Tab>
            <Tab eventKey="events" title="Events">
              <ClubSectionTitle>Club Events</ClubSectionTitle>
              <ClubCardGrid>
                <ClubEvents />
              </ClubCardGrid>
            </Tab>
            <Tab eventKey="routes" title="Routes">
              <ClubSectionTitle>Club Routes</ClubSectionTitle>
              <ClubCardGrid>
                <ClubRoutes />
              </ClubCardGrid>
            </Tab>
            <Tab eventKey="group" title="Group Feed">
              <ClubSectionTitle>Club Group Feed</ClubSectionTitle>
              <ClubGroupFeed />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}