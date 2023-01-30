import React, { useState, useEffect } from 'react'
import { getCardinalString } from '@/utils/helperFunctions'
import { ICritterElementProps } from '@/types'

export default function WallFollower ({ x, y, tileSize, critter }: ICritterElementProps) {

  const [direction, setDirection] = useState(getCardinalString(critter.facing))

  useEffect(() => {
    setDirection(getCardinalString(critter.facing))
  }, [critter.facing])

  const critterStyle = {
    transform: `translate(${x * tileSize}px,${y * tileSize}px)`,
    width: `${tileSize}px`,
    height: `${tileSize}px`
  }

  const classString = `critter wall-follower critter-facing-${direction}`


  return (
    <div style={critterStyle} className={classString}></div>
  )
}
