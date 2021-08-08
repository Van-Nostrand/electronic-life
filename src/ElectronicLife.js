import React, { useState, useEffect } from 'react';
import World from "./World";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from "./constants/CONSTANTS";
// import { CreatureTemplate, Creature } from "./Creature";
import { updateCreatures } from "./constants/updateCreatures";
import { findNearestWall, deriveDirectionFromCoordinates } from './constants/helperFunctions';
import { BouncingCritter, WallFollower } from './critters';

const initdata = (function() {
  let creatureArray = [];
  let worldMap = DEFAULT_PLAN.map((row, y) => {
    return row.split("").map((tile, x) => {
      if (tile === "b") {
        creatureArray.push(
          new BouncingCritter(x, y, {x: 0, y: -1})
        );
        return " ";
      }
      else if (tile === "w") {
        creatureArray.push(
          new WallFollower(x, y, {x: 0, y: -1})
        )
        return " ";
      }
      
      else {
        return tile;
      }
    })
  });
  return [worldMap, creatureArray];
})();

export default function ElectronicLife(){

  const [ world, setWorld ] = useState(initdata[0]);
  const [ critters, setCreatures ] = useState(initdata[1]);

  // game setup
  useEffect(() => {
    const takeTurn = () => {
      let newCreatures = updateCreatures(critters, world);
      setCreatures(newCreatures);
    }

    const gameTicks = setInterval(() => takeTurn(), 1000);
    return () => clearInterval(gameTicks);
  }, []);

  return(
    <div className="main-container">
      {/* <div id="button-panel">
        <div className="div-button" id="dbutton1"></div>
        <div className="div-button" id="dbutton2"></div>
        <div className="div-button" id="dbutton3"></div>
      </div> */}
      <World worldMap={world} critters={critters} />

    </div>
  );
}
