import React from "react";
import "./World.css";
import View from "./View";
import Wall from "./Wall";
import PlainTile from "./PlainTile";
import { BouncingCritter, WallFollower } from "./VariousCritters";

const getTile = (tileType, key) => {
  switch(true){
    case tileType === "#": return <Wall key={key} />;
    case tileType === "b": return <BouncingCritter key={key} />;
    case tileType === "w": return <WallFollower key={key} />;
    case tileType === " ": return <PlainTile key={key} />;
    default: console.log("error getting tiles");
  }
}

const World2 = ({worldMap = []}) => {
  let worldArray = worldMap.map((row, i) => {
    return row.map((tile, j) => {
      // return React.cloneElement(LEGEND[tile], {key: j});
      return getTile(tile, j);
    })
  });


  return(
    <div id="world-div">
      {worldArray ? worldArray : null}
    </div>
  )
}

export default World2;
