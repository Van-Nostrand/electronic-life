import React from 'react'

// no longer necessary
export default function BouncingCritter ({ tileSize, x, y }: {tileSize: number, x: number, y: number }) {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }

  return (
    <div style={critterStyle} className="critter bouncing-critter"></div>
  )
}

BouncingCritter.defaultProps = {
  tileSize: 2.5
}

