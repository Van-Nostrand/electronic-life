import React, { ReactElement } from 'react'
import { ICritterElementProps } from './types'

export default function CritterElement ({ tileSize = 2.5, x, y, classString }: ICritterElementProps): ReactElement {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  return (
    <div style={critterStyle} className={classString}></div>
  )
}
