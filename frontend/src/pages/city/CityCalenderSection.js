import React from 'react'
import { Card } from 'react-bootstrap'
import { CalendarIcon } from "lucide-react"
import { format } from 'date-fns'
import styles from '../../styles/CityProfilePage.module.css'

export default function CityCalendarSection({ date, setDate }) {
  return (
    <div className={styles.calendarWrapper}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardContent}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className={styles.calendar}
          />
        </Card.Body>
      </Card>
      <Card className={styles.card}>
        <Card.Body className={styles.cardContent}>
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
  )
}