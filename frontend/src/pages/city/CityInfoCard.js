import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Users, Calendar, Route } from "lucide-react"
import styles from '../CityProfilePage.module.css'
import IconWrapper from './IconWrapper'

export default function InfoCard({ type, data }) {
  switch (type) {
    case 'route':
      return (
        <Card className={`${styles.card} ${styles.imageCard}`}>
          <div className="relative h-48">
            <Image
              src={data.image}
              alt={data.name}
              className="object-cover"
              fill
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{data.name}</h3>
            <IconWrapper icon={Route} text={data.distance} />
          </div>
        </Card>
      )
    case 'club':
      return (
        <Card className={styles.card}>
          <div className={`${styles.cardContent} flex items-center`}>
            <div className="relative h-16 w-16 overflow-hidden rounded-full mr-4">
              <Image
                src={data.image}
                alt={data.name}
                className="object-cover"
                fill
              />
            </div>
            <div>
              <h3 className={styles.cardTitle}>{data.name}</h3>
              <IconWrapper icon={Users} text={data.members} />
            </div>
          </div>
        </Card>
      )
    case 'event':
      return (
        <Card className={`${styles.card} ${styles.imageCard}`}>
          <div className="relative h-48">
            <Image
              src={data.image}
              alt={data.name}
              className="object-cover"
              fill
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{data.name}</h3>
            <IconWrapper icon={Users} text={data.participants} />
            <Button className={styles.button}>Register</Button>
          </div>
        </Card>
      )
    case 'runup':
      return (
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{data.name}</h3>
            <IconWrapper icon={Calendar} text={data.date} />
            <IconWrapper icon={Route} text={`${data.distance}, Pace: ${data.pace}`} />
            <IconWrapper icon={Users} text={`${data.participants} participants`} />
            <Button className={styles.button}>Join RunUp</Button>
          </div>
        </Card>
      )
    default:
      return null
  }
}