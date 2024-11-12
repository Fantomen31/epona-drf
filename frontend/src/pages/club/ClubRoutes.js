import React from 'react'
import ClubInfoCard from './ClubInfoCard'

const ClubEvents = ({ limit }) => {
  const clubEvents = [
    { name: "Weekly Long Run", date: "Every Sunday, 7:00 AM", image: "/placeholder.svg?height=200&width=300" },
    { name: "Track Tuesday", date: "Every Tuesday, 6:30 PM", image: "/placeholder.svg?height=200&width=300" },
    { name: "Summer 5K Series", date: "June 1 - August 31, 2023", image: "/placeholder.svg?height=200&width=300" },
    { name: "Annual Club Marathon", date: "October 15, 2023", image: "/placeholder.svg?height=200&width=300" },
  ]

  const displayEvents = limit ? clubEvents.slice(0, limit) : clubEvents

  return (
    <>
      {displayEvents.map((event, index) => (
        <ClubInfoCard key={index} type="event" data={event} />
      ))}
    </>
  )
}

export default ClubEvents