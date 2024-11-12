import React from 'react'
import { Card, Button } from 'react-bootstrap'

import { Users, Calendar, Route } from "lucide-react"
import styles from '../../styles/CityProfilePage.module.css'
import CityIconWrapper from './CityIconWrapper'

export default function CityInfoCard({ type, data }) {
  switch (type) {
    case 'route':
      return (
        <Card className={`${styles.card} ${styles.imageCard}`}>
          <div className="relative h-48">
            <img
              src={data.image}
              alt={data.name}
              className="object-cover"
              fill
            />
          </div>
          <Card.Body className={styles.cardContent}>
            <Card.Title className={styles.cardTitle}>{data.name}</Card.Title>
            <CityIconWrapper icon={Route} text={data.distance} />
          </Card.Body>
        </Card>
      )
    case 'club':
      return (
        <Card className={styles.card}>
          <Card.Body className={`${styles.cardContent} d-flex align-items-center`}>
            <div className="relative h-16 w-16 overflow-hidden rounded-full mr-4">
            <img
              src={data.image}
              alt={data.name}
              className="object-cover"
              fill
            />
            </div>
            <div>
              <Card.Title className={styles.cardTitle}>{data.name}</Card.Title>
              <CityIconWrapper icon={Users} text={data.members} />
            </div>
          </Card.Body>
        </Card>
      )
    case 'event':
      return (
        <Card className={`${styles.card} ${styles.imageCard}`}>
          <div className="relative h-48">
           <img
              src={data.image}
              alt={data.name}
              className="object-cover"
              fill
            />
          </div>
          <Card.Body className={styles.cardContent}>
            <Card.Title className={styles.cardTitle}>{data.name}</Card.Title>
            <CityIconWrapper icon={Users} text={data.participants} />
            <Button className={styles.button}>Register</Button>
          </Card.Body>
        </Card>
      )
    case 'runup':
      return (
        <Card className={styles.card}>
          <Card.Body className={styles.cardContent}>
            <Card.Title className={styles.cardTitle}>{data.name}</Card.Title>
            <CityIconWrapper icon={Calendar} text={data.date} />
            <CityIconWrapper icon={Route} text={`${data.distance}, Pace: ${data.pace}`} />
            <CityIconWrapper icon={Users} text={`${data.participants} participants`} />
            <Button className={styles.button}>Join RunUp</Button>
          </Card.Body>
        </Card>
      )
    default:
      return null
  }
}