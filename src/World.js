import React from "react";
import PropTypes from 'prop-types';
import "./World.css";
import { BouncingCritter, WallFollower, CritterElement } from "./components";
import { getSurroundingTiles, findNearestWall } from './constants/helperFunctions';


export default function World({ worldMap, creatures }) {

  const getTile = (tileType, row, column = 0) => {
    switch(true){
      case tileType === "#": return <div className="wall-div" key={`wall-${row}-${column}`}></div>;
      case tileType === " ": return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>;
      default: console.log("error getting tiles");
    }
  }
  const getCreature = (creature, number) => {
    return <CritterElement key={`bc-${number}`} classString={creature.classString} x={creature.x} y={creature.y} />;
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
  // debugger;

  ///////////////////////////////////////////// 
  /// Testing
  // let surroundings = getSurroundingTiles(creatures[0], worldMap, 4);
  // print2dArray(surroundings)
  

  return(
    <div className="world-div" >
      {worldArray ? worldArray : null}
      {creatureArray ? creatureArray : null}
    </div>
  )
};

const print2dArray = (arr) => {
  arr.forEach(row => console.log(row.join()))
}

World.defaultProps = {
  worldMap: [],
  creatures: []
}

World.propTypes = {
  worldMap: PropTypes.array,
  creatures: PropTypes.array
}