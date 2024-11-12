import React from 'react'
import ClubInfoCard from './ClubInfoCard'

const ClubRoutes = ({ limit }) => {
  const clubRoutes = [
    { name: "Golden Gate Bridge Loop", distance: "6 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Presidio Trail", distance: "4.5 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Embarcadero Waterfront", distance: "3.1 miles", image: "/placeholder.svg?height=200&width=300" },
    { name: "Lands End Coastal Trail", distance: "3.4 miles", image: "/placeholder.svg?height=200&width=300" },
  ]

  const displayRoutes = limit ? clubRoutes.slice(0, limit) : clubRoutes

  return (
    <>
      {displayRoutes.map((route, index) => (
        <ClubInfoCard key={index} type="route" data={route} />
      ))}
    </>
  )
}

export default ClubRoutes