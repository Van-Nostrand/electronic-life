import React, { useContext, useMemo, useCallback } from 'react'
import { BouncingCritter, WallFollower } from '@/components'
import { WorldContext } from '@/context'
import { IWorldProps, ICritter } from '@/types'
import '@/styles/world.css'

export default function World ({ worldMap, critters }: IWorldProps) {
  const { state: { tileSize } } = useContext(WorldContext)
  const sizeString = `${tileSize}px`

  const renderedWorld = useMemo(
    () => worldMap.map((row, iRow) => {
      const cellSize = { width: `${tileSize}px`, height: `${tileSize}px` }
      return (
        <div
          className='world__row'
          style={{ height: sizeString }}
          key={`world-row-${iRow}`}
        >
          {row.map((tile, jColumn) => {
            if (tile === '#') {
              return (
                <div
                  style={cellSize}
                  className='wall-div'
                  key={`wall-${jColumn}-${iRow}`}
                />
              )
            }
            if (tile === ' ') {
              return (
                <div
                  style={cellSize}
                  className='plain-tile'
                  key={`tile-${jColumn}-${iRow}`}
                />
              )
            }
          })}
        </div>
      )
    }),
    [worldMap, sizeString, tileSize]
  )

  const renderedCritters = useMemo(
    () => critters.map((critter, i) => {
      if (critter.type === 'b') {
        return (
          <BouncingCritter
            critter={critter}
            x={critter.x}
            y={critter.y}
            tileSize={tileSize}
            key={`bc-${i}`}
          />
        )
      }
      if (critter.type === 'w') {
        return (
          <WallFollower
            critter={critter}
            x={critter.x}
            y={critter.y}
            tileSize={tileSize}
            key={`wf-${i}`}
          />
        )
      }
      return <div key={`error-${i}`}>ERROR!</div>
    }),
    [critters, tileSize]
  )


  return (
    <div
      className='world'
      style={{
        width: `${worldMap[0].length * tileSize}px`,
        height: `${worldMap.length * tileSize}px`
      }}
    >
      {renderedWorld}
      {renderedCritters}
    </div>
  )
}
