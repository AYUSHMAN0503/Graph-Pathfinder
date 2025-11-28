import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Graph-Pathfinder',
  description: 'Interactive A* and Dijkstra Pathfinding Simulator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
