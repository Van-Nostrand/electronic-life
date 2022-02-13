import React from 'react'
import { CritterElement } from '@/components'
import { IWorldProps } from '@/types'
import { ICritterProps } from '@/critters/types'
import { getCardinalString } from '@/constants/CONSTANTS'

/**
 * World
 * This handles rendering. It's a dumb box
 */
export default function World ({ worldMap = [], critters = [] }: IWorldProps) {

  const getTile = (tileType: string, row: number, column = 0) => {
    switch (true) {
      case tileType === '#':
        return <div className="wall" key={`wall-${row}-${column}`} />
      case tileType === ' ':
        return <div className="plain-tile" key={`tile-${row}-${column}`} />
      default: console.log('error getting tiles')
    }
  }

  const getCritter = (c: ICritterProps, number: number) => {
    const newClassString: string = c.classString + ' ' + 'critter-facing-' + getCardinalString(c.facing.x, c.facing.y)
    return (
      <CritterElement
        key={`critter-${number}`}
        classString={newClassString}
        x={c.x}
        y={c.y}
      />
    )
  }

  const renderWorld = () => {
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

  const renderCritters = () => {
    return critters.map((critter, i) => getCritter(critter, i))
  }

  return (
    <div className="world" >
      { renderWorld() }
      { renderCritters() }
    </div>
  )
}

// just for testing
// const print2dArray = (arr) => {
//   arr.forEach(row => console.log(row.join()))
// }
