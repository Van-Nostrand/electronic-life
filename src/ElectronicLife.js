import React, { useState, useEffect } from 'react';
import World from "./World";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from "./constants/CONSTANTS";
import { CreatureTemplate, Creature } from "./Creature";
import { updateCreatures } from "./constants/updateCreatures";
import { findNearestWall, deriveDirectionFromCoordinates } from './constants/helperFunctions';

const initdata = (function() {
  let creatureArray = [];
  let worldMap = DEFAULT_PLAN.map((row, y) => {
    return row.split("").map((tile, x) => {
      if (tile === "b") {
        let properties = {creatureType: tile, x, y};
        creatureArray.push(
          // CreatureTemplate(tile, x, y, false)
          new Creature(properties)
        );
        return " ";
      }
      else if (tile === "w") {
        let properties = {creatureType: tile, x, y};
        creatureArray.push(
          // CreatureTemplate(tile, x, y, false)
          new Creature(properties)
        )
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
  const [ creatures, setCreatures ] = useState(initdata[1]);

  useEffect(() => {
    // setup the game here... 
    const takeTurn = () => {
      let newCreatures = updateCreatures(creatures, world);
      setCreatures(newCreatures);
    }
    let [ nearestWall, radius ] = findNearestWall(creatures[0], world);
    let newDirection = deriveDirectionFromCoordinates(nearestWall, radius);


    const gameTicks = setInterval(() => takeTurn(), 1000);
    return () => clearInterval(gameTicks);
  }, []);


  return(
    <div id="electronic-life-div">
      <div id="button-panel">
        <div className="div-button" id="dbutton1"></div>
        <div className="div-button" id="dbutton2"></div>
        <div className="div-button" id="dbutton3"></div>
      </div>
      <World worldMap={world} creatures={creatures} />

    </div>
  );
}
