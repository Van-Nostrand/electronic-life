import React from "react";

export const BouncingCritter = (props) => {

  const TILE_SIZE = 2.5;

  let critterStyle = {
    transform: `translate(${props.x * TILE_SIZE}rem,${props.y * TILE_SIZE}rem)`
  }
  
  return(
    <div style={critterStyle} className="creature bouncing-critter-div"></div>
  )
}

export const WallFollower = (props) => {
  return(
    <div className="creature wall-follower-div"></div>
  )
}
