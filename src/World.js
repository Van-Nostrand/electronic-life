import React from "react";
import "./World.css";
// import View from "./View";
import { BouncingCritter, WallFollower } from "./VariousCritters";

const getTile = (tileType, row, column = 0) => {
  switch(true){
    case tileType === "#": return <div className="wall-div" key={`wall-${row}-${column}`}></div>;
    case tileType === " ": return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>;
    default: console.log("error getting tiles");
  }
}
const getCreature = (creature, number) => {
  switch(true){
    case creature.creatureType === "b": return <BouncingCritter x={creature.x} y={creature.y} key={`bc-${number}`} />;
    case creature.creatureType === "w": return <WallFollower x={creature.x} y={creature.y} key={`wf-${number}`} />;
    default: console.log("error getting creatures");
  }
}
// const getTile = (tileType, row, column) => {
//   switch(true){
//     case tileType === "#": return <Wall key={`wall-${row}-${column}`} />;
//     case tileType === "b": return <BouncingCritter key={`bc-${row}-${column}`} />;
//     case tileType === "w": return <WallFollower key={`wf-${row}-${column}`} />;
//     case tileType === " ": return <PlainTile key={`tile-${row}-${column}`} />;
//     default: console.log("error getting tiles");
//   }
// }

export const World = ({worldMap = [], creatures = []}) => {
  console.log(worldMap);
  let worldArray = worldMap.map((row, i) => {
    return (
      <div 
        className="world-row-div" 
        key={`world-div-row-${i}`} >
        {row.map((tile, j) => {
          return getTile(tile, j, i);
        })}
      </div>
    );
  });

  let creatureArray = creatures.map((creature, i) => {
    return (
      <div className="creature" key={`creature-${i}`}>
        { getCreature(creature, i) }
      </div>
    )
  })

  return(
    <div className="world-div" >
      {worldArray ? worldArray : null}
      <div className="creature-container">
        {creatureArray ? creatureArray : null}
      </div>
    </div>
  )
};
