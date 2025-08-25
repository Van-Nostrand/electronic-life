import React, { useState, useEffect, useContext } from 'react'
import World from '@/containers/World'
import { DEFAULT_PLAN } from '@/utils/constants'
import Critter from '@/classes/Critter'
import { updateCritters } from '@/utils/updateCritters'
import { useWindowToGetTileSize } from '@/hooks'
import { WorldContext } from '@/context'

import '@/styles/electronic-life.css'
import Footer from './components/Footer'

type TInitData = {
  worldMap: string[][]
  critters: Critter[]
}

const initdata = (() => {
  return DEFAULT_PLAN.reduce<TInitData>((acc, row, y) => {
    const splitString = row.split('').map((tile, x) => {
      if (tile === 'b') {
        // b === regular critter?
        const properties = { critterType: tile, x, y }
        acc.critters.push(new Critter(properties))
        return ' '
      } else if (tile === 'w') {
        // will eventually be WallFollowers
        return ' '
      } else {
        return tile
      }
    })
    acc.worldMap.push(splitString)
    return acc
  }, { worldMap: [], critters: [] })
})()

export default function ElectronicLife () {
  const [critters, setCritters] = useState(initdata.critters)
  const [newTileSize] = useWindowToGetTileSize()

  const { updateTileSize } = useContext(WorldContext)

  useEffect(() => {
    updateTileSize(newTileSize)
  }, [newTileSize])

  useEffect(() => {
    const takeTurn = () => {
      setCritters(updateCritters(critters, initdata.worldMap))
    }

    const gameTicks = setInterval(takeTurn, 1000)
    return () => clearInterval(gameTicks)
  }, [])


  return (
    <div className="electronic-life">
      <World worldMap={initdata.worldMap} critters={critters} />
      <Footer />
    </div>
  )
}
