import React from 'react'

// no longer necessary
export default function WallFollower ({ x, y, tileSize }: {x:number, y:number, tileSize:number}) {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  return (
    <div style={critterStyle} className="critter wall-follower"></div>
  )
}

WallFollower.defaultProps = {
  tileSize: 2.5
}
