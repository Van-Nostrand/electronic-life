import React from 'react'
import './World.css'
import { BouncingCritter, WallFollower } from './components'
import { viewAllSurroundingTiles } from './functions/helperFunctions'
import { IWorldProps, ICritter } from '@/types'

export default function World({ worldMap, creatures }: IWorldProps) {

  const getTile = (tileType: string, row: number, column = 0) => {
    switch (true) {
      case tileType === '#': return <div className="wall-div" key={`wall-${row}-${column}`}></div>
      case tileType === ' ': return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>
      default: console.log('error getting tiles')
    }
  }
  const getCreature = (creature: ICritter, number: number) => {
    switch (true) {
      case creature.creatureType === 'b':
        return <BouncingCritter x={creature.x} y={creature.y} key={`bc-${number}`} />
      case creature.creatureType === 'w':
        return <WallFollower x={creature.x} y={creature.y} key={`wf-${number}`} />
      default: console.log('error getting creatures')
    }
  }

  const buildWorld = () => {
    return worldMap.map((row, i) => {
      return (
        <div
          className="world-row-div"
          key={`world-div-row-${i}`}
        >
          {row.map((tile, j) => {
            return getTile(tile, j, i)
          })}
        </div>
      )
    })
  }

  const buildCreatures = () => {
    return creatures.map((creature: ICritter, i: number) => {
      return (
        <div className="creature" key={`creature-${i}`}>
          {getCreature(creature, i)}
        </div>
      )
    })
  }

  const worldArray = buildWorld()
  const creatureArray = buildCreatures()
  // debugger;

  /////////////////////////////////////////////
  /// Testing
  const surroundings = viewAllSurroundingTiles(creatures[0], worldMap, 4)
  // print2dArray(surroundings)


  return (
    <div className="world-div" >
      {worldArray ? worldArray : null}
      {creatureArray ? creatureArray : null}
    </div>
  )
}

const print2dArray = (arr: Array<Array<any>>) => {
  arr.forEach(row => console.log(row.join()))
}

World.defaultProps = {
  worldMap: [],
  creatures: []
}
