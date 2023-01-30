import React from 'react'
import { ICritterProps } from '@/types'

export default function BouncingCritter ({ tileSize, x, y }: ICritterProps) {

  const critterStyle = {
    transform: `translate(${x * tileSize}px,${y * tileSize}px)`,
    width: `${tileSize}px`,
    height: `${tileSize}px`
  }

  return (
    <div
      style={critterStyle}
      className="creature bouncing-critter"
    />
  )
}
