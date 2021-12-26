import React from 'react'
import { CritterElement } from '@/components'
import { getSurroundingTiles, findNearestWall } from '@/constants/helperFunctions'
import { IWorldProps } from '@/types'


export default function World<IWorldProps> ({ worldMap, critters }) {

  const getTile = (tileType, row, column = 0) => {
    switch (true) {
      case tileType === '#': return <div className="wall" key={`wall-${row}-${column}`}></div>
      case tileType === ' ': return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>
      default: console.log('error getting tiles')
    }
  }

  const getCritter = (c, number) => {
    return (
      <CritterElement
        key={`critter-${number}`}
        classString={c.classString}
        x={c.x}
        y={c.y}
      />
    )
  }

  const buildWorld = () => {
    return worldMap.map((row, i) => {
      return (
        <div
          className="world-row"
          key={`world-row-${i}`}
        >
          {row.map((tile, j) => {
            return getTile(tile, j, i)
          })}
        </div>
      )
    })
  }

  const buildCritters = () => {
    return critters.map((critter, i) => getCritter(critter, i))
  }

  const worldArray = buildWorld()
  const critterArray = buildCritters()

  return (
    <div className="world" >
      {worldArray ? worldArray : null}
      {critterArray ? critterArray : null}
    </div>
  )
}

// just for testing
const print2dArray = (arr) => {
  arr.forEach(row => console.log(row.join()))
}

World.defaultProps = {
  worldMap: [],
  critters: []
}
