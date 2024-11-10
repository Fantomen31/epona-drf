import React, { useState } from 'react';
import { Card, Button, Tabs, Tab } from 'react-bootstrap';
import { ArrowUp, Users, Calendar as CalendarIcon, Clock, Route } from 'lucide-react';
import { format } from 'date-fns';
import styles from '../../styles/CityProfilePage.module.css';

export default function CityProfilePage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.cityProfileContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="San Francisco skyline"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.cityName}>San Francisco</h1>
          <p className={styles.cityStats}>7.7M miles run in this city • 100,000 runners</p>
        </div>
      </div>

      {/* Navigation */}
      <Tabs defaultActiveKey="overview" className="mb-3">
        <Tab eventKey="overview" title="Overview">
          {/* City Details Section */}
          <section>
            <h2 className={styles.sectionTitle}>City Details</h2>
            <Card className={styles.card}>
              <Card.Body className={styles.cardContent}>
                <div className={styles.cardGrid}>
                  <div>
                    <p className={styles.cardText}>Country</p>
                    <p className={styles.cardTitle}>USA</p>
                  </div>
                  <div>
                    <p className={styles.cardText}>Population</p>
                    <p className={styles.cardTitle}>883,305</p>
                  </div>
                  <div>
                    <p className={styles.cardText}>Area</p>
                    <p className={styles.cardTitle}>121.4 km²</p>
                  </div>
                  <div>
                    <p className={styles.cardText}>Climate</p>
                    <p className={styles.cardTitle}>Mediterranean</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </section>

          {/* City Health Section */}
          <section>
            <h2 className={styles.sectionTitle}>City Health</h2>
            <div className={styles.cardGrid}>
              <Card className={styles.card}>
                <Card.Body className={styles.cardContent}>
                  <p className={styles.cardText}>Total Miles Run</p>
                  <p className={styles.cardTitle}>7.7M</p>
                  <div className={styles.iconWrapper}>
                    <ArrowUp className={styles.icon} />
                    <span className={styles.cardText}>+2%</span>
                  </div>
                </Card.Body>
              </Card>
              <Card className={styles.card}>
                <Card.Body className={styles.cardContent}>
                  <p className={styles.cardText}>Total Runners</p>
                  <p className={styles.cardTitle}>1M</p>
                  <div className={styles.iconWrapper}>
                    <ArrowUp className={styles.icon} />
                    <span className={styles.cardText}>+3%</span>
                  </div>
                </Card.Body>
              </Card>
              <Card className={styles.card}>
                <Card.Body className={styles.cardContent}>
                  <p className={styles.cardText}>Total Runs</p>
                  <p className={styles.cardTitle}>1M</p>
                  <div className={styles.iconWrapper}>
                    <ArrowUp className={styles.icon} />
                    <span className={styles.cardText}>+5%</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </section>

          {/* Popular Routes Section */}
          <section>
            <h2 className={styles.sectionTitle}>Popular Routes</h2>
            <div className={styles.cardGrid}>
              {[
                { name: "Golden Gate Bridge", distance: "4.8 miles", image: "/placeholder.svg?height=200&width=300" },
                { name: "Ocean Beach", distance: "5.7 miles", image: "/placeholder.svg?height=200&width=300" },
                { name: "Lands End Trail", distance: "3.4 miles", image: "/placeholder.svg?height=200&width=300" },
                { name: "Chrissy Field", distance: "3.1 miles", image: "/placeholder.svg?height=200&width=300" },
              ].map((route, i) => (
                <Card key={i} className={`${styles.card} ${styles.imageCard}`}>
                  <Card.Img variant="top" src={route.image} alt={route.name} />
                  <Card.ImgOverlay>
                    <Card.Title>{route.name}</Card.Title>
                    <Card.Text>{route.distance}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              ))}
            </div>
          </section>

          {/* Local Clubs Section */}
          <section>
            <h2 className={styles.sectionTitle}>Local Clubs</h2>
            <div className={styles.cardGrid}>
              {[
                { name: "San Francisco Road Runners", members: "1,200 members", image: "/placeholder.svg?height=100&width=100" },
                { name: "Run365", members: "500 members", image: "/placeholder.svg?height=100&width=100" },
                { name: "Golden Gate Triathlon Club", members: "300 members", image: "/placeholder.svg?height=100&width=100" },
                { name: "DSE Runners", members: "1,000 members", image: "/placeholder.svg?height=100&width=100" },
              ].map((club, i) => (
                <Card key={i} className={styles.card}>
                  <Card.Body className="d-flex align-items-center">
                    <img src={club.image} alt={club.name} className={styles.clubImage} />
                    <div>
                      <Card.Title>{club.name}</Card.Title>
                      <Card.Text>{club.members}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <div className={styles.cardGrid}>
              {[
                { name: "San Francisco Marathon", participants: "20,000 runners", image: "/placeholder.svg?height=200&width=300" },
                { name: "Bay to Breakers", participants: "50,000 runners", image: "/placeholder.svg?height=200&width=300" },
                { name: "Golden Gate Park 10K", participants: "5,000 runners", image: "/placeholder.svg?height=200&width=300" },
                { name: "Escape from Alcatraz Triathlon", participants: "2,000 triathletes", image: "/placeholder.svg?height=200&width=300" },
              ].map((event, i) => (
                <Card key={i} className={`${styles.card} ${styles.imageCard}`}>
                  <Card.Img variant="top" src={event.image} alt={event.name} />
                  <Card.ImgOverlay>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>{event.participants}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              ))}
            </div>
          </section>
        </Tab>

        <Tab eventKey="routes" title="Routes">
          <h2 className={styles.sectionTitle}>Popular Running Routes</h2>
          <div className={styles.cardGrid}>
            {[
              { name: "Golden Gate Bridge Loop", distance: "6.2 miles", elevation: "390 ft" },
              { name: "Lands End Coastal Trail", distance: "3.4 miles", elevation: "275 ft" },
              { name: "Presidio Park Run", distance: "4.5 miles", elevation: "320 ft" },
              { name: "Embarcadero Waterfront", distance: "7.5 miles", elevation: "30 ft" },
              { name: "Twin Peaks Summit", distance: "2.1 miles", elevation: "680 ft" },
              { name: "Golden Gate Park Loop", distance: "6.8 miles", elevation: "150 ft" },
            ].map((route, index) => (
              <Card key={index} className={styles.card}>
                <Card.Body>
                  <Card.Title>{route.name}</Card.Title>
                  <div className={styles.iconWrapper}>
                    <Route className={styles.icon} />
                    <span className={styles.cardText}>{route.distance}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <ArrowUp className={styles.icon} />
                    <span className={styles.cardText}>{route.elevation} elevation gain</span>
                  </div>
                  <Button className={styles.button}>View Route</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab eventKey="clubs" title="Clubs">
          <h2 className={styles.sectionTitle}>Running Clubs in San Francisco</h2>
          <div className={styles.cardGrid}>
            {[
              { name: "San Francisco Road Runners", members: 1200, founded: 1995 },
              { name: "DSE Runners", members: 1000, founded: 1970 },
              { name: "Golden Gate Triathlon Club", members: 300, founded: 2005 },
              { name: "Run365", members: 500, founded: 2010 },
              { name: "SF FrontRunners", members: 400, founded: 1974 },
              { name: "November Project SF", members: 600, founded: 2013 },
            ].map((club, index) => (
              <Card key={index} className={styles.card}>
                <Card.Body>
                  <Card.Title>{club.name}</Card.Title>
                  <div className={styles.iconWrapper}>
                    <Users className={styles.icon} />
                    <span className={styles.cardText}>{club.members} members</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <CalendarIcon className={styles.icon} />
                    <span className={styles.cardText}>Founded in {club.founded}</span>
                  </div>
                  <Button className={styles.button}>Join Club</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab eventKey="events" title="Events">
          <h2 className={styles.sectionTitle}>Upcoming Running Events</h2>
          <div className={styles.cardGrid}>
            {[
              { name: "San Francisco Marathon", date: "July 23, 2023", participants: 25000, distance: "26.2 miles" },
              { name: "Bay to Breakers", date: "May 21, 2023", participants: 50000, distance: "12K" },
              { name: "Golden Gate Half Marathon", date: "November 5, 2023", participants: 5000, distance: "13.1 miles" },
              { name: "SF Giant Race", date: "September 10, 2023", participants: 10000, distance: "10K/5K" },
              { name: "Bridge to Bridge Run", date: "October 1, 2023", participants: 3500, distance: "12K" },
              { name: "Across the Bay 12K", date: "June 11, 2023", participants: 4000, distance: "12K" },
            ].map((event, index) => (
              <Card key={index} className={styles.card}>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <div className={styles.iconWrapper}>
                    <CalendarIcon className={styles.icon} />
                    <span className={styles.cardText}>{event.date}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <Users className={styles.icon} />
                    <span className={styles.cardText}>{event.participants} participants</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <Route className={styles.icon} />
                    <span className={styles.cardText}>{event.distance}</span>
                  </div>
                  <Button className={styles.button}>Register</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab eventKey="runups" title="RunUps">
          <h2 className={styles.sectionTitle}>Upcoming RunUps</h2>
          <div className={styles.cardGrid}>
            {[
              { name: "Golden Gate Park Morning Run", date: "May 15, 2023", time: "7:00 AM", distance: "5K", pace: "9:30 min/mile", participants: 15 },
              { name: "Embarcadero Sunset Jog", date: "May 16, 2023", time: "6:30 PM", distance: "4 miles", pace: "10:00 min/mile", participants: 10 },
              { name: "Presidio Trail Adventure", date: "May 17, 2023", time: "8:00 AM", distance: "6 miles", pace: "11:00 min/mile", participants: 8 },
              { name: "Marina Green Speed Work", date: "May 18, 2023", time: "6:00 PM", distance: "3 miles", pace: "8:00 min/mile", participants: 12 },
              { name: "Lands End Coastal Run", date: "May 19, 2023", time: "7:30 AM", distance: "4 miles", pace: "10:30 min/mile", participants: 6 },
              { name: "Mission Bay Loop", date: "May 20, 2023", time: "9:00 AM", distance: "5K", pace: "9:00 min/mile", participants: 20 },
            ].map((runup, index) => (
              <Card key={index} className={styles.card}>
                <Card.Body>
                  <Card.Title>{runup.name}</Card.Title>
                  <div className={styles.iconWrapper}>
                    <CalendarIcon className={styles.icon} />
                    <span className={styles.cardText}>{runup.date}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <Clock className={styles.icon} />
                    <span className={styles.cardText}>{runup.time}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <Route className={styles.icon} />
                    <span className={styles.cardText}>{runup.distance}, Pace: {runup.pace}</span>
                  </div>
                  <div className={styles.iconWrapper}>
                    <Users className={styles.icon} />
                    <span className={styles.cardText}>{runup.participants} participants</span>
                  </div>
                  <Button className={styles.button}>Join RunUp</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab eventKey="calendar" title="Calendar">
          <h2 className={styles.sectionTitle}>City Running Calendar</h2>
          <div className={styles.calendarWrapper}>
            <Card className={styles.card}>
              <Card.Body>
                <input 
                  type="date" 
                  value={date.toISOString().split('T')[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className={styles.calendarInput}
                />
              </Card.Body>
            </Card>
            <Card className={styles.card}>
              <Card.Body>
                <h3 className={styles.cardTitle}>Events on {format(date, 'MMMM d, yyyy')}</h3>
                <ul className={styles.eventList}>
                  <li className={styles.eventItem}>
                    <CalendarIcon className={styles.eventIcon} />
                    <div className={styles.eventContent}>
                      <p className={styles.eventTitle}>Morning RunUp at Golden Gate Park</p>
                      <p className={styles.eventDetails}>7:00 AM - 5K run</p>
                    </div>
                  </li>
                  <li className={styles.eventItem}>
                    <CalendarIcon className={styles.eventIcon} />
                    <div className={styles.eventContent}>
                      <p className={styles.eventTitle}>SF Runners Club Weekly Meet</p>
                      <p className={styles.eventDetails}>6:30 PM - All levels welcome</p>
                    </div>
                  </li>
                  <li className={styles.eventItem}>
                    <CalendarIcon className={styles.eventIcon} />
                    <div className={styles.eventContent}>
                      <p className={styles.eventTitle}>Presidio Trail Running Workshop</p>
                      <p className={styles.eventDetails}>5:00 PM - Beginner friendly</p>
                    </div>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}