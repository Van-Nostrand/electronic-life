import React from 'react'
import { ICritterProps } from '@/types'

export default function BouncingCritter ({ tileSize = 2.5, x, y }: ICritterProps) {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }

  return (
    <div style={critterStyle} className="creature bouncing-critter"></div>
  )
}
