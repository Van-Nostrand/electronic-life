import React, { Component } from "react";
import "./World.css";
import View from "./View";
// import BouncingCritter from "./BouncingCritter";
import Wall from "./Wall";
import PlainTile from "./PlainTile";
import { BouncingCritter, WallFollower } from "./VariousCritters";

const LEGEND = {
  "#": <Wall />,
  "b": <BouncingCritter />,
  "w": <WallFollower />,
  " ": <PlainTile />
};

const World = (props) => {
  let worldArray = props.worldMap.map((row, i) => {
    return row.map((tile, j) => {
      return React.cloneElement(LEGEND[tile], {key: j});
    })
  });


  return(
    <div id="world-div">
      {worldArray ? worldArray : null}
    </div>
  )
}

export default World;
