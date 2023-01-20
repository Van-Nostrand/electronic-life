import React, { useState, useEffect } from 'react'
import World from './World'
import './ElectronicLife.css'
import { DEFAULT_PLAN } from './CONSTANTS'
import { Creature } from './Creature'
import { updateCreatures } from './functions/updateCreatures'
// import { ICreature } from '@/types'

const initdata = (() => {
  return DEFAULT_PLAN.reduce((acc, row, y) => {
    const [worldMap, critters] = acc
    worldMap.push(row.split('').map((tile, x) => {
      if (tile === 'b') {
        const properties = { creatureType: tile, x, y }
        // const nuCreature = new (Creature as any)(properties)
        critters.push(
          // CreatureTemplate(tile, x, y, false)
          new Creature(properties)
        )
        return ' '
      } else if (tile === 'w') {
        const properties = { creatureType: tile, x, y }
        critters.push(
          // CreatureTemplate(tile, x, y, false)
          new Creature(properties)
        )
        return ' '
      } else {
        return tile
      }
    }))
    return [worldMap, critters]
  }, [[], []])
  // const creatureArray: ICreature[] = []
  // const worldMap: string[][] = DEFAULT_PLAN.map((row, y) => {
  //   return row.split('').map((tile, x) => {
  //     if (tile === 'b') {
  //       const properties = { creatureType: tile, x, y }
  //       // const nuCreature = new (Creature as any)(properties)
  //       creatureArray.push(
  //         // CreatureTemplate(tile, x, y, false)
  //         new Creature(properties)
  //       )
  //       return ' '
  //     }
  //     else if (tile === 'w') {
  //       const properties = { creatureType: tile, x, y }
  //       creatureArray.push(
  //         // CreatureTemplate(tile, x, y, false)
  //         new Creature(properties)
  //       )
  //     }

  //     else {
  //       return tile
  //     }
  //   })
  // })
  // return [worldMap, creatureArray]
})()

export default function ElectronicLife () {

  const [creatures, setCreatures] = useState(initdata[1])

  useEffect(() => {
    // setup the game here...
    const takeTurn = () => {

      const newCreatures = updateCreatures(creatures, initdata[0])
      setCreatures(newCreatures)
    }

    const gameTicks = setInterval(() => takeTurn(), 1000)
    return () => clearInterval(gameTicks)
  }, [])


  return (
    <div id="electronic-life-div">
      <div id="button-panel">
        <div className="div-button" id="dbutton1"></div>
        <div className="div-button" id="dbutton2"></div>
        <div className="div-button" id="dbutton3"></div>
      </div>
      <World worldMap={initdata[0]} creatures={creatures} />

    </div>
  )
}
