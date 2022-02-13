import React, { useState, useEffect } from 'react'
import World from './World'
// // import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
//   // updateGrid,
} from '@/constants/CONSTANTS'
// // import { updateCritters } from '@/constants/updateCritters'
// // import { findNearestWall, deriveDirectionFromCoordinates } from '@/constants/helperFunctions'
import { BouncingCritter, WallFollower } from '@/critters'
import { ICritter } from '@/critters/types'

/**
 * this creates two arrays, and then reads a starting plan (2d array of chars) and fills the arrays based on that
 * critterArray is linear and is filled with critter objects with properties based on what is read out of the starting plan
 * worldMap is a 2d array of tiles that represent the world - spaces and #s
 */
const initdata = (function () {
  console.log('INIT DATA IS RUNNING')
  const critterArray: Array<ICritter> = []
  const worldMap = DEFAULT_PLAN.map((row: any, y: number) => {
    return row.split('').map((tile: any, x: number) => {
      if (tile === 'b') {
        critterArray.push(
          BouncingCritter({ x, y, facing: { x: 0, y: -1 } })
        )
        return ' '
      }
      else if (tile === 'w') {
        critterArray.push(
          WallFollower({ x, y, facing: { x: 0, y: -1 } })
        )
        return ' '
      }

      else {
        return tile
      }
    })
  })
  return [worldMap, critterArray]
})()

/**
 * ElectronicLife
 * this runs the main loop and tells each critter to take a turn
 */
export default function ElectronicLife () {

  const world = initdata[0]
  const [ critters, setCritters ] = useState<Array<ICritter>>(initdata[1])

  // game setup
  useEffect(() => {
    const takeTurn = () => {
      const newCritters: Array<ICritter> = []
      try {
        for (const critter of critters) {
          const returnVal = critter.takeTurn(world)
          if (returnVal instanceof Error) {
            throw returnVal
          } else {
            newCritters.push(returnVal)
          }
        }
      } catch (error) {
        console.error('error happened in ElectronicLife useEffect takeTurn ():', error.message)
      }

      // let newCritters: Array<{}> = updateCritters(critters, world);
      setCritters(newCritters)
    }

    const gameTicks = setInterval(() => takeTurn(), 1000)
    return () => clearInterval(gameTicks)
  }, [])

  return (
    <div className="main-container">
      {/* <div id="button-panel">
        <div className="div-button" id="dbutton1"></div>
        <div className="div-button" id="dbutton2"></div>
        <div className="div-button" id="dbutton3"></div>
      </div> */}
      {/* <div className="critter bouncing-critter critter-facing-nw"></div> */}
      <World
        worldMap={world}
        critters={critters}
      />

    </div>
  )
}
