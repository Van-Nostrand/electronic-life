import { viewAllSurroundingTiles } from './helperFunctions';
//update the creatures array
export const updateCreatures = (creatureArray, worldArray) => {
  
  const CARDINAL_DIRECTIONS = [
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
    
    let hasChosenDirection = false;
    //while the creature has not moved yet
    while(!hasChosenDirection){
      let facedCell = worldArray[creature.y + creature.facing.y][creature.x + creature.facing.x];
      // if the cell the creature is facing contains another creature or a wall... 
      if (facedCell === "#" || facedCell === "b") {
        // turn
        let newFacing = CARDINAL_DIRECTIONS[Math.floor(Math.random()*8)]; 
        creature.facing = { x: newFacing.x, y: newFacing.y };
      }
      // else if the cell is a clear space
      else if (facedCell === " ") {
        creature.x = creature.x + creature.facing.x;
        creature.y = creature.y + creature.facing.y;
        creature.hasMoved = true;
        hasChosenDirection = true;
      }
    }
    // todo - double check: I'm mutating the creature object, but it's from deep copied state... is that ok?
    return creature;
  });
  
  return creatureArray;
}
