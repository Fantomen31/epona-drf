import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { format } from 'date-fns'
import styles from './CityProfilePage.module.css'
import HeroSection from './components/HeroSection'
import CityOverview from './components/CityOverview'
import CardGrid from './components/CardGrid'
import InfoCard from './components/InfoCard'
import CalendarSection from './components/CalendarSection'
import SectionTitle from './components/SectionTitle'

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
    <div className={styles.cityProfileContainer}>
      <HeroSection
        cityName="San Francisco"
        cityStats="7.7M miles run in this city • 100,000 runners"
        imageUrl="/placeholder.svg?height=400&width=800"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="overview" className={styles.tabsTrigger}>Overview</TabsTrigger>
          <TabsTrigger value="routes" className={styles.tabsTrigger}>Routes</TabsTrigger>
          <TabsTrigger value="clubs" className={styles.tabsTrigger}>Clubs</TabsTrigger>
          <TabsTrigger value="events" className={styles.tabsTrigger}>Events</TabsTrigger>
          <TabsTrigger value="runups" className={styles.tabsTrigger}>RunUps</TabsTrigger>
          <TabsTrigger value="calendar" className={styles.tabsTrigger}>Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className={styles.tabsContent}>
          <CityOverview />
          <SectionTitle>Popular Routes</SectionTitle>
          <CardGrid>
            {popularRoutes.map((route, index) => (
              <InfoCard key={index} type="route" data={route} />
            ))}
          </CardGrid>
          <SectionTitle>Local Clubs</SectionTitle>
          <CardGrid>
            {localClubs.map((club, index) => (
              <InfoCard key={index} type="club" data={club} />
            ))}
          </CardGrid>
          <SectionTitle>Upcoming Events</SectionTitle>
          <CardGrid>
            {upcomingEvents.map((event, index) => (
              <InfoCard key={index} type="event" data={event} />
            ))}
          </CardGrid>
        </TabsContent>

        <TabsContent value="routes" className={styles.tabsContent}>
          <SectionTitle>Popular Running Routes</SectionTitle>
          <CardGrid>
            {popularRoutes.map((route, index) => (
              <InfoCard key={index} type="route" data={route} />
            ))}
          </CardGrid>
        </TabsContent>

        <TabsContent value="clubs" className={styles.tabsContent}>
          <SectionTitle>Running Clubs in San Francisco</SectionTitle>
          <CardGrid>
            {localClubs.map((club, index) => (
              <InfoCard key={index} type="club" data={club} />
            ))}
          </CardGrid>
        </TabsContent>

        <TabsContent value="events" className={styles.tabsContent}>
          <SectionTitle>Upcoming Running Events</SectionTitle>
          <CardGrid>
            {upcomingEvents.map((event, index) => (
              <InfoCard key={index} type="event" data={event} />
            ))}
          </CardGrid>
        </TabsContent>

        <TabsContent value="runups" className={styles.tabsContent}>
          <SectionTitle>Upcoming RunUps</SectionTitle>
          <CardGrid>
            {[
              { name: "Golden Gate Park Morning Run", date: "May 15, 2023", time: "7:00 AM", distance: "5K", pace: "9:30 min/mile", participants: 15 },
              { name: "Embarcadero Sunset Jog", date: "May 16, 2023", time: "6:30 PM", distance: "4 miles", pace: "10:00 min/mile", participants: 10 },
              { name: "Presidio Trail Adventure", date: "May 17, 2023", time: "8:00 AM", distance: "6 miles", pace: "11:00 min/mile", participants: 8 },
              { name: "Marina Green Speed Work", date: "May 18, 2023", time: "6:00 PM", distance: "3 miles", pace: "8:00 min/mile", participants: 12 },
            ].map((runup, index) => (
              <InfoCard key={index} type="runup" data={runup} />
            ))}
          </CardGrid>
        </TabsContent>

        <TabsContent value="calendar" className={styles.tabsContent}>
          <SectionTitle>City Running Calendar</SectionTitle>
          <CalendarSection date={date} setDate={setDate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}