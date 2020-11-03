import {useState, useEffect} from "react";

//update the creatures array
export const updateCreatures = (creatureArray, gridArray) => {

  const DIRECTIONS = [
    {x: 0, y: -1}, //n
    {x: 1, y: -1}, //ne
    {x: 1, y: 0},  //e
    {x: 1, y: 1},  //se
    {x: 0, y: 1},  //s
    {x: -1, y: 1}, //sw
    {x: -1, y: 0}, //w
    {x: -1, y: -1} //nw
  ];
  
  //state has already been copied. it is already a new array.
  creatureArray = creatureArray.map((creature, i) => {
    
    let facing = {};
    let hasMoved = false;
    let x, y;
    
    //while the creature has not moved yet
    while(!hasMoved){

      // decide if the creature will turn
        // if yes, decide how much the creature will turn by
      // find the new cell
      // decide if the new cell is empty
        // if the cell is empty, check that other creatures aren't already moving there
        // if no other creatures are moving there, write the data to the creature and flag it as having moved
        // if the move is invalid, restart the process

      let newView = DIRECTIONS[Math.floor(Math.random()*8)]; 
      x = creature.x + newView.x;
      y = creature.y + newView.y;

      let chosenTile = gridArray[x][y];
      // if the chosen cell is empty
      if(chosenTile === " "){        

        facing = {x: newView.x, y: newView.y};
        hasMoved = true;
      }
    }
    return {...creature, facing, hasMoved, x, y};
  });
  
  return creatureArray;
}