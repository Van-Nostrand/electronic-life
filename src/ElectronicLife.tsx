import React, { useState, useEffect, useContext } from 'react'
import World from '@/containers/World'
import './ElectronicLife.css'
import { DEFAULT_PLAN } from '@/utils/constants'
import Critter from '@/classes/Critter'
import { updateCritters } from '@/utils/updateCritters'
import { useWindowToGetTileSize } from '@/hooks'
import { WorldContext } from '@/context'

const initdata = (() => {
  return DEFAULT_PLAN.reduce((acc, row, y) => {
    const [worldMap, critters] = acc
    worldMap.push(row.split('').map((tile, x) => {
      if (tile === 'b') {
        const properties = { critterType: tile, x, y }
        critters.push(new Critter(properties))
        return ' '
      } else if (tile === 'w') {
        // will eventually be WallFollowers
        return ' '
      } else {
        return tile
      }
    }))
    return [worldMap, critters]
  }, [[], []])
})()

console.log('INIT DATA IS', initdata)

export default function ElectronicLife () {

  const [creatures, setCreatures] = useState(initdata[1])
  const [newTileSize] = useWindowToGetTileSize()

  const { updateTileSize } = useContext(WorldContext)

  useEffect(() => {
    updateTileSize(newTileSize)
  }, [newTileSize])

  useEffect(() => {
    // game loop
    const takeTurn = () => {

      const newCreatures = updateCritters(creatures, initdata[0])
      setCreatures(newCreatures)
    }

    const gameTicks = setInterval(takeTurn, 1000)
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
