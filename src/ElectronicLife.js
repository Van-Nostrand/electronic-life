import React, { useState, useEffect } from 'react';
import World from "./World";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from "./CONSTANTS";
import { CreatureTemplate, Creature } from "./Creature";
import { updateCreatures } from "./functions/updateCreatures";

const initdata = (function() {
  let creatureArray = [];
  let worldMap = DEFAULT_PLAN.map((row, y) => {
    return row.split("").map((tile, x) => {
      if (tile === "b") {
        creatureArray.push(
          CreatureTemplate(tile, x, y, false)
        );
        return " ";
      }
      else if (tile === "w") {
        creatureArray.push(
          CreatureTemplate(tile, x, y, false)
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

    const gameTicks = setInterval(() => takeTurn(), 1000);
    return () => clearInterval(gameTicks);
  }, []);

  let testCreature = new Creature();
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
