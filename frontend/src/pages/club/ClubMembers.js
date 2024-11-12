import React from 'react'
import ClubInfoCard from './ClubInfoCard'

const ClubMembers = ({ limit }) => {
  const clubMembers = [
    { name: "John Doe", runningLevel: "Advanced", image: "/placeholder.svg?height=200&width=200" },
    { name: "Jane Smith", runningLevel: "Intermediate", image: "/placeholder.svg?height=200&width=200" },
    { name: "Mike Johnson", runningLevel: "Beginner", image: "/placeholder.svg?height=200&width=200" },
    { name: "Emily Brown", runningLevel: "Advanced", image: "/placeholder.svg?height=200&width=200" },
  ]

  const displayMembers = limit ? clubMembers.slice(0, limit) : clubMembers

  return (
    <>
      {displayMembers.map((member, index) => (
        <ClubInfoCard key={index} type="member" data={member} />
      ))}
    </>
  )
}

export default ClubMembers