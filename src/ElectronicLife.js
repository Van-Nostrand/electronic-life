import React, { useState, useEffect } from 'react';
import { World } from "./World";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from "./CONSTANTS";
import { CreatureTemplate } from "./Creature";
import { updateCreatures } from "./functions/updateCreatures";

const initdata = (function() {
  let worldArray = DEFAULT_PLAN;
  let creatureArray = [];
  let gridArray = worldArray.map((row, x) => {
    return row.split("").map((tile, y) => {
      if(tile === "b"){
        creatureArray.push(
          CreatureTemplate(tile, x, y, false)
        );
        return " ";
      }
      else {
        return tile;
      }
    })
  });
  return [gridArray, creatureArray];
})();

export default function ElectronicLife(){

  const [ grid, setGrid ] = useState(initdata[0]);
  const [ creatures, setCreatures ] = useState(initdata[1]);


  useEffect(() => {
    // setup the game here... 
    const takeTurn = () => {
      let newCreatures = creatures.map((creature, i) => {
        return Object.assign({}, creature);
      });
      newCreatures = updateCreatures(newCreatures, grid);
      setCreatures(newCreatures);
    }

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
      <World worldMap={grid} creatures={creatures} />

    </div>
  );
}
