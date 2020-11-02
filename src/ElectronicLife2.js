import React, {useState, useEffect} from 'react';
import World2 from "./World2";
import "./ElectronicLife.css";
import {
  DEFAULT_PLAN,
  updateGrid,
  updateCreatures
} from "./CONSTANTS";

export default function ElectronicLife2(){

  
  let initdata = (function(){
    let worldArray = DEFAULT_PLAN;
    let creatureArray = [];
    let gridArray = worldArray.map((row, yPos) => {
      return row.split("").map((tile, xPos) => {
        if(tile === "b")
          creatureArray.push({
            creatureType: tile,
            x: xPos,
            y: yPos,
            hasMoved: false,
            facing: {x:0, y:0}
          });
        return tile;
      })
    });
    return [gridArray, creatureArray];
  })();


  const [ grid, setGrid ] = useState(initdata[0]);
  const [ creatures, setCreatures ] = useState(initdata[1]);

  const takeTurn = () => {
    //functions are copying state. unnecessary... 
    let newCreatures = new Array(creatures.length).fill().map((creature, i) => {
      return Object.assign({}, creatures[i]);
    });
    let newGrid = new Array(grid.length).fill().map((row, i) => {
      return new Array(grid[i].length).fill().map((vector, j) => {
        return grid[i][j];
      })
    });
    // console.log("creatures inside taketurn()");
    // console.log(creatures);

    newCreatures = updateCreatures(newCreatures, newGrid);
    newGrid = updateGrid(newCreatures, newGrid);

    setGrid(oldgrid => newGrid);
    setCreatures(oldcreatures => newCreatures);
  }

  useEffect(() => {

    const TIME = setInterval(() => takeTurn(), 1000);
    return () => clearInterval(TIME);
  }, []);

  return(
    <div id="electronic-life-div">
      <div id="button-panel">
        <div className="div-button" id="dbutton1"></div>
        <div className="div-button" id="dbutton2"></div>
        <div className="div-button" id="dbutton3"></div>
      </div>
      <World2 worldMap={grid}/>

    </div>

  );
  
}
