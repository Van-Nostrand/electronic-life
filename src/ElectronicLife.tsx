import React, { useState, useEffect, useContext } from 'react'
import World from '@/containers/World'
import { DEFAULT_PLAN } from '@/utils/constants'
import Critter from '@/classes/Critter'
import { updateCritters } from '@/utils/updateCritters'
import { useWindowToGetTileSize } from '@/hooks'
import { WorldContext } from '@/context'

import '@/scss/containers/electronic-life.scss'

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

export default function ElectronicLife () {

  const [critters, setCritters] = useState(initdata[1])
  const [newTileSize] = useWindowToGetTileSize()

  const { updateTileSize } = useContext(WorldContext)

  useEffect(() => {
    updateTileSize(newTileSize)
  }, [newTileSize])

  useEffect(() => {
    // game loop
    const takeTurn = () => {

      setCritters(updateCritters(critters, initdata[0]))
    }

    const gameTicks = setInterval(takeTurn, 1000)
    return () => clearInterval(gameTicks)
  }, [])


  return (
    <div className="electronic-life">

      <World worldMap={initdata[0]} critters={critters} />

      <footer>
        <a className="iconlink" href="mailto:dmdoull43@gmail.com" target="_blank" rel="noreferrer">
          <img src={require('@/assets/email.png')} alt="email" />
        </a>
        <a className="iconlink" href="https://github.com/Van-Nostrand/electronic-life" target="_blank" rel="noreferrer">
          <img src={require('@/assets/github.svg')} alt="https://github.com/Van-Nostrand/electronic-life" />
        </a>
        <a className="iconlink" href="https://www.linkedin.com/in/mike-doull-34b9211a6/" target="_blank" rel="noreferrer">
          <img src={require('@/assets/linkedin2.svg')} alt="https://www.linkedin.com/in/mike-doull-34b9211a6/" />
        </a>
      </footer>
    </div>
  )
}
