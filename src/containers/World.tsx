import React, { useContext } from 'react'
import { BouncingCritter, WallFollower } from '@/components'
import { WorldContext } from '@/context'
import { IWorldProps, ICritter } from '@/types'
import '@/scss/containers/world.scss'

export default function World ({ worldMap = [], creatures = [] }: IWorldProps) {
  const { state: { tileSize } } = useContext(WorldContext)
  const sizeString = `${tileSize}px`
  const cellSize = { width: `${tileSize}px`, height: `${tileSize}px` }

  const getTile = (tileType: string, row: number, column = 0) => {
    switch (true) {
      case tileType === '#':
        return (
          <div
            style={cellSize}
            className="wall-div"
            key={`wall-${row}-${column}`}
          ></div>
        )
      case tileType === ' ':
        return (
          <div
            style={cellSize}
            className="plain-tile"
            key={`tile-${row}-${column}`}
          ></div>
        )
      default: console.log('error getting tiles')
    }
  }

  const getCreature = (creature: ICritter, number: number) => {
    switch (true) {
      case creature.type === 'b':
        return (
          <BouncingCritter
            x={creature.x}
            y={creature.y}
            tileSize={tileSize}
            key={`bc-${number}`}
          />
        )
      case creature.type === 'w':
        return (
          <WallFollower
            x={creature.x}
            y={creature.y}
            tileSize={tileSize}
            key={`wf-${number}`}
          />
        )
      default: console.log('error getting creatures')
    }
  }

  const buildWorld = () => {
    return worldMap.map((row, i) => {
      return (
        <div
          className="world__row"
          style={{ height: sizeString }}
          key={`world-row-${i}`}
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
        <div
          className="creature"
          style={cellSize}
          key={`creature-${i}`}
        >
          {getCreature(creature, i)}
        </div>
      )
    })
  }

  const worldArray = buildWorld()
  const creatureArray = buildCreatures()

  return (
    <div
      className="world"
      style={{
        width: `${worldMap[0].length * tileSize}px`,
        height: `${worldMap.length * tileSize}px`
      }}
    >
      {worldArray ? worldArray : null}
      {creatureArray ? creatureArray : null}
    </div>
  )
}
