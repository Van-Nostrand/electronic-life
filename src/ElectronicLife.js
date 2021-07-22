import React, { useState, useEffect } from 'react';
import { World } from "./World";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
} from "./CONSTANTS";
import { CreatureTemplate } from "./Creature";
import { updateCreatures } from "./functions/updateCreatures";

export default function ElectronicLife(){
  
  let initdata = (function(){
    let worldArray = DEFAULT_PLAN;
    let creatureArray = [];
    let gridArray = worldArray.map((row, yPos) => {
      return row.split("").map((tile, xPos) => {
        if(tile === "b"){
          creatureArray.push(
            CreatureTemplate(tile,xPos, yPos, false)
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

  const [ grid, setGrid ] = useState(initdata[0]);
  const [ creatures, setCreatures ] = useState(initdata[1]);

  const takeTurn = () => {
    //functions are copying state....
    let newCreatures = new Array(creatures.length).fill().map((creature, i) => {
      return Object.assign({}, creatures[i]);
    });

    newCreatures = updateCreatures(newCreatures, grid);
    
    setCreatures(oldcreatures => newCreatures);
  }

  useEffect(() => {
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
