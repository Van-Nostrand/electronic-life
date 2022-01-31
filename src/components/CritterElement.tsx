import React from 'react';
import PropTypes from 'prop-types';
import { CritterElementInterface } from '../types';

export default function CritterElement<CritterElementInterface>({tileSize, x, y, classString}){

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  return (
    <div style={critterStyle} className={classString}></div>
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
