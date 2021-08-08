import React from "react";
import PropTypes from 'prop-types';
import "./World.css";
import { BouncingCritter, WallFollower, CritterElement } from "./components";
import { getSurroundingTiles, findNearestWall } from './constants/helperFunctions';


export default function World({ worldMap, creatures }) {

  const getTile = (tileType, row, column = 0) => {
    switch(true){
      case tileType === "#": return <div className="wall" key={`wall-${row}-${column}`}></div>;
      case tileType === " ": return <div className="plain-tile" key={`tile-${row}-${column}`} ></div>;
      default: console.log("error getting tiles");
    }
  }

  const getCritter = (critter, number) => {
    return (
      <CritterElement 
        key={`critter-${number}`} 
        classString={critter.classString} 
        x={critter.x} 
        y={critter.y} 
      />
    )
  }

  const buildWorld = () => {
    return worldMap.map((row, i) => {
      return (
        <div 
          className="world-row" 
          key={`world-row-${i}`} 
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
          { getCritter(creature, i) }
        </div>
      )
    })
  }
 
  let worldArray = buildWorld();
  let creatureArray = buildCreatures();  

  return(
    <div className="world" >
      {worldArray ? worldArray : null}
      {creatureArray ? creatureArray : null}
    </div>
  )
};

// just for testing
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