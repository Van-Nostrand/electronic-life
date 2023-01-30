import React, { useState, useEffect } from 'react'
import { getCardinalString } from '@/utils/helperFunctions'
import { ICritterElementProps } from '@/types'
import '@/scss/components/_critter.scss'

export default function BouncingCritter ({ tileSize, x, y, critter }: ICritterElementProps) {

  const [direction, setDirection] = useState(getCardinalString(critter.facing))

  useEffect(() => {
    setDirection(getCardinalString(critter.facing))
  }, [critter.facing])

  const critterStyle = {
    transform: `translate(${x * tileSize}px,${y * tileSize}px)`,
    width: `${tileSize}px`,
    height: `${tileSize}px`
  }

  const classString = `critter bouncing-critter critter-facing-${direction}`

  return (
    <div
      style={critterStyle}
      className={classString}
    >
      <img src={require('@/assets/edit-anime-face.svg')} />
    </div>
  )
}
