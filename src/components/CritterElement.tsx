import React, { ReactElement } from 'react'
import PropTypes from 'prop-types';
import { ICritterElement, ICritterElementProps } from '@/types'

export default function CritterElement({tileSize, x, y, classString}: ICritterElementProps): ReactElement {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  return (
    <div
      style={critterStyle}
      className={classString}
    />
  )
}

CritterElement.defaultProps = {
  tileSize: 2.5,
  classString: 'critter'
}

CritterElement.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  classString: PropTypes.string,
  tileSize: PropTypes.number
}
