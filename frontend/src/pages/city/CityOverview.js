import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowUp } from "lucide-react"
import styles from '../../styles/CityProfilePage.module.css'
import CitySectionTitle from './CitySectionTitle'
import CityIconWrapper from './CityIconWrapper'

export default function CityOverview() {
  return (
    <>
      <CitySectionTitle>City Details</CitySectionTitle>
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

      <CitySectionTitle>City Health</CitySectionTitle>
      <div className={styles.cardGrid}>
        <Card className={styles.card}>
          <Card.Body className={styles.cardContent}>
            <p className={styles.cardText}>Total Miles Run</p>
            <p className={styles.cardTitle}>7.7M</p>
            <CityIconWrapper icon={ArrowUp} text="+2%" />
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body className={styles.cardContent}>
            <p className={styles.cardText}>Total Runners</p>
            <p className={styles.cardTitle}>1M</p>
            <CityIconWrapper icon={ArrowUp} text="+3%" />
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body className={styles.cardContent}>
            <p className={styles.cardText}>Total Runs</p>
            <p className={styles.cardTitle}>1M</p>
            <CityIconWrapper icon={ArrowUp} text="+5%" />
          </Card.Body>
        </Card>
      </div>
    </>
  )
}