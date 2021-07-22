import React from "react";
import PropTypes from "prop-types";

export const BouncingCritter = (props) => {

  const TILE_SIZE = props.tileSize;

  let critterStyle = {
    transform: `translate(${props.x * TILE_SIZE}rem,${props.y * TILE_SIZE}rem)`
  }
  
  return(
    <div style={critterStyle} className="creature bouncing-critter-div"></div>
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

export const WallFollower = (props) => {
  return(
    <div className="creature wall-follower-div"></div>
  )
}
