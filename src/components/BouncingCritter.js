import React from "react";
import PropTypes from "prop-types";


// no longer necessary
export default function BouncingCritter({tileSize, x, y}) {

  const critterStyle = {
    transform: `translate(${x * tileSize}rem,${y * tileSize}rem)`
  }
  
  return (
    <div style={critterStyle} className="critter bouncing-critter"></div>
  )
}

BouncingCritter.defaultProps = {
  tileSize: 2.5
}

BouncingCritter.propTypes = {
  tileSize: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
}