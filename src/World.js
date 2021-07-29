import React from "react";
import PropTypes from 'prop-types';
import "./World.css";
import { BouncingCritter, WallFollower } from "./components";
import { viewAllSurroundingTiles } from './functions/helperFunctions';


export default function World({ worldMap, creatures }) {

  const getTile = (tileType, row, column = 0) => {
    switch(true){
      case tileType === "#": return <div className="wall-div" key={`wall-${row}-${column}`}></div>;
      case tileType === " ": return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>;
      default: console.log("error getting tiles");
    }
  }
  const getCreature = (creature, number) => {
    switch(true){
      case creature.creatureType === "b": 
        return <BouncingCritter x={creature.x} y={creature.y} key={`bc-${number}`} />;
        break;
      case creature.creatureType === "w": 
        return <WallFollower x={creature.x} y={creature.y} key={`wf-${number}`} />;
        break;
      default: console.log("error getting creatures");
    }
  }

  const buildWorld = () => {
    return worldMap.map((row, i) => {
      return (
        <div 
          className="world-row-div" 
          key={`world-div-row-${i}`} 
        >
          {row.map((tile, j) => {
            return getTile(tile, j, i);
          })}
        </div>
      );
    });
  }

  const buildCreatures = () => {
    return creatures.map((creature, i) => {
      return (
        <div className="creature" key={`creature-${i}`}>
          { getCreature(creature, i) }
        </div>
      )
    })
  }
 
  let worldArray = buildWorld();
  let creatureArray = buildCreatures();

  // viewAllSurroundingTiles(creatureArray[0], worldArray);

  return(
    <div className="world-div" >
      {worldArray ? worldArray : null}
      {creatureArray ? creatureArray : null}
    </div>
  )
};

World.defaultProps = {
  worldMap: [],
  creatures: []
}

World.propTypes = {
  worldMap: PropTypes.array,
  creatures: PropTypes.array
}