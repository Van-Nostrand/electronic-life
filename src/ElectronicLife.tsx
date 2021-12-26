import React, { useState, useEffect } from 'react'
import World from './World'
// import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from './constants/CONSTANTS'
import { updateCritters } from '@/constants/updateCritters'
import { findNearestWall, deriveDirectionFromCoordinates } from '@/constants/helperFunctions'
import { BouncingCritter, WallFollower, Critter } from '@/critters'
import { ICritter } from '@/types'

const initdata = (function () {
  const critterArray: Array<ICritter> = []
  const worldMap = DEFAULT_PLAN.map((row, y) => {
    return row.split('').map((tile, x) => {
      if (tile === 'b') {
        critterArray.push(
          new BouncingCritter(x, y, { x: 0, y: -1 })
        )
        return ' '
      }
      else if (tile === 'w') {
        critterArray.push(
          new WallFollower(x, y, { x: 0, y: -1 })
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


export default function ElectronicLife () {

  const [ world, setWorld ] = useState(initdata[0])
  const [ critters, setCritters ] = useState(initdata[1])

  // game setup
  useEffect(() => {
    const takeTurn = () => {
      const newCritters = critters.map(critter => critter.takeTurn(world))
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
      <World worldMap={world} critters={critters} />

    </div>
  )
}
