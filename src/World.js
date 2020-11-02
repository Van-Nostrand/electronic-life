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

export const World = ({worldMap = []}) => {

  let worldArray = worldMap.map((row, i) => {
    return (
      <div 
        className="world-row-div" 
        key={`world-div-row-${i}`} >
        {row.map((tile, j) => {
          return getTile(tile, j);
        })}
      </div>
    );
  });

  return(
    <div className="world-div" >
      {worldArray ? worldArray : null}
    </div>
  )
};
