import React, { useContext } from 'react'
import { BouncingCritter, WallFollower } from '@/components'
import { WorldContext } from '@/context'
import { IWorldProps, ICritter } from '@/types'
import '@/scss/containers/world.scss'

export default function World ({ worldMap = [], critters = [] }: IWorldProps) {
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

  const getCritter = (critter: ICritter, number: number) => {
    switch (true) {
      case critter.type === 'b':
        return (
          <BouncingCritter
            critter={critter}
            x={critter.x}
            y={critter.y}
            tileSize={tileSize}
            key={`bc-${number}`}
          />
        )
      case critter.type === 'w':
        return (
          <WallFollower
            critter={critter}
            x={critter.x}
            y={critter.y}
            tileSize={tileSize}
            key={`wf-${number}`}
          />
        )
      default: console.log('error getting critters')
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

  const buildCritters = () => {
    return critters.map((critter: ICritter, i: number) => {
      return getCritter(critter, i)

      // <div
      //   className="critter"
      //   style={cellSize}
      //   key={`critter-${i}`}
      // >
      //   {getCritter(critter, i)}
      // </div>
    })
  }

  const worldArray = buildWorld()
  const creatureArray = buildCritters()

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
