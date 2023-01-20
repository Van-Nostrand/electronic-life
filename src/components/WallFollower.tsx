import React from 'react'
import { ICritterProps } from '@/types'

export default function WallFollower ({ x, y, tileSize = 2.5 }: ICritterProps) {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  return (
    <div style={critterStyle} className="creature wall-follower"></div>
  )
}
