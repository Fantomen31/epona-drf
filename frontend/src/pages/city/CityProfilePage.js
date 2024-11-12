import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import styles from '../../styles/CityProfilePage.module.css'
import CityHeroSection from './CityHeroSection'
import CityOverview from './CityOverview'
import CityCardGrid from './CityCardGrid'
import CityInfoCard from './CityInfoCard'
import CityCalendarSection from './CityCalenderSection'
import CitySectionTitle from './CitySectionTitle'
import ProfileSideMenu from '../profile/ProfileSideMenu'

export default function CityProfilePage() {
  const [date, setDate] = useState(new Date())

  const popularRoutes = [
    { name: "Golden Gate Bridge", distance: "4.8 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Ocean Beach", distance: "5.7 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Lands End Trail", distance: "3.4 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Chrissy Field", distance: "3.1 miles", image: "/placeholder.svg?height=200&width=300" },
  ]

  const localClubs = [
    { name: "San Francisco Road Runners", members: "1,200 members", image: "/placeholder.svg?height=100&width=100" },
    { name: "Run365", members: "500 members", image: "/placeholder.svg?height=100&width=100" },
    { name: "Golden Gate Triathlon Club", members: "300 members", image: "/placeholder.svg?height=100&width=100" },
    { name: "DSE Runners", members: "1,000 members", image: "/placeholder.svg?height=100&width=100" },
  ]

  const upcomingEvents = [
    { name: "San Francisco Marathon", participants: "20,000 runners", image: "/placeholder.svg?height=200&width=300" },
    { name: "Bay to Breakers", participants: "50,000 runners", image: "/placeholder.svg?height=200&width=300" },
    { name: "Golden Gate Park 10K", participants: "5,000 runners", image: "/placeholder.svg?height=200&width=300" },
    { name: "Escape from Alcatraz Triathlon", participants: "2,000 triathletes", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <Container fluid className={styles.cityProfileContainer}>
      <Row>
        <Col md={2} className={styles.sidebarColumn}>
          <ProfileSideMenu />
        </Col>
        <Col md={10} className={styles.mainContent}>
          <CityHeroSection
            cityName="San Francisco"
            cityStats="7.7M miles run in this city • 100,000 runners"
            imageUrl="/placeholder.svg?height=400&width=800"
          />

          <Tabs defaultActiveKey="overview" className={`mb-3 ${styles.cityTabs}`}>
            <Tab eventKey="overview" title="Overview">
              <CityOverview />
              <CitySectionTitle>Popular Routes</CitySectionTitle>
              <CityCardGrid>
                {popularRoutes.map((route, index) => (
                  <CityInfoCard key={index} type="route" data={route} />
                ))}
              </CityCardGrid>
              <CitySectionTitle>Local Clubs</CitySectionTitle>
              <CityCardGrid>
                {localClubs.map((club, index) => (
                  <CityInfoCard key={index} type="club" data={club} />
                ))}
              </CityCardGrid>
              <CitySectionTitle>Upcoming Events</CitySectionTitle>
              <CityCardGrid>
                {upcomingEvents.map((event, index) => (
                  <CityInfoCard key={index} type="event" data={event} />
                ))}
              </CityCardGrid>
            </Tab>
            <Tab eventKey="routes" title="Routes">
              <CitySectionTitle>Popular Running Routes</CitySectionTitle>
              <CityCardGrid>
                {popularRoutes.map((route, index) => (
                  <CityInfoCard key={index} type="route" data={route} />
                ))}
              </CityCardGrid>
            </Tab>
            <Tab eventKey="clubs" title="Clubs">
              <CitySectionTitle>Running Clubs in San Francisco</CitySectionTitle>
              <CityCardGrid>
                {localClubs.map((club, index) => (
                  <CityInfoCard key={index} type="club" data={club} />
                ))}
              </CityCardGrid>
            </Tab>
            <Tab eventKey="events" title="Events">
              <CitySectionTitle>Upcoming Running Events</CitySectionTitle>
              <CityCardGrid>
                {upcomingEvents.map((event, index) => (
                  <CityInfoCard key={index} type="event" data={event} />
                ))}
              </CityCardGrid>
            </Tab>
            <Tab eventKey="runups" title="RunUps">
              <CitySectionTitle>Upcoming RunUps</CitySectionTitle>
              <CityCardGrid>
                {[
                  { name: "Golden Gate Park Morning Run", date: "May 15, 2023", time: "7:00 AM", distance: "5K", pace: "9:30 min/mile", participants: 15 },
                  { name: "Embarcadero Sunset Jog", date: "May 16, 2023", time: "6:30 PM", distance: "4 miles", pace: "10:00 min/mile", participants: 10 },
                  { name: "Presidio Trail Adventure", date: "May 17, 2023", time: "8:00 AM", distance: "6 miles", pace: "11:00 min/mile", participants: 8 },
                  { name: "Marina Green Speed Work", date: "May 18, 2023", time: "6:00 PM", distance: "3 miles", pace: "8:00 min/mile", participants: 12 },
                ].map((runup, index) => (
                  <CityInfoCard key={index} type="runup" data={runup} />
                ))}
              </CityCardGrid>
            </Tab>
            <Tab eventKey="calendar" title="Calendar">
              <CitySectionTitle>City Running Calendar</CitySectionTitle>
              <CityCalendarSection date={date} setDate={setDate} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}