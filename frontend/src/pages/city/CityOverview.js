import React from 'react'
import { Card } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import styles from '../CityProfilePage.module.css'
import SectionTitle from './SectionTitle'
import IconWrapper from './IconWrapper'

export default function CityOverview() {
  return (
    <>
      <SectionTitle>City Details</SectionTitle>
      <Card className={styles.card}>
        <div className={styles.cardContent}>
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
        </div>
      </Card>

      <SectionTitle>City Health</SectionTitle>
      <div className={styles.cardGrid}>
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>Total Miles Run</p>
            <p className={styles.cardTitle}>7.7M</p>
            <IconWrapper icon={ArrowUp} text="+2%" />
          </div>
        </Card>
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>Total Runners</p>
            <p className={styles.cardTitle}>1M</p>
            <IconWrapper icon={ArrowUp} text="+3%" />
          </div>
        </Card>
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.cardText}>Total Runs</p>
            <p className={styles.cardTitle}>1M</p>
            <IconWrapper icon={ArrowUp} text="+5%" />
          </div>
        </Card>
      </div>
    </>
  )
}