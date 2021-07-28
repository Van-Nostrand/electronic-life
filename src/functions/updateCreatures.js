
//update the creatures array
export const updateCreatures = (creatureArray, gridArray) => {

  // creatureArray is  
  // Array(7) [ {…}, {…}, {…}, {…}, {…}, {…}, {…} ]
  // 0: Object { creatureType: "b", x: 1, y: 19, … }
  // creatureType: "b"
  // facing: Object { x: 0, y: -1 }
  // foodChain: 0
  // hasMoved: false
  // speed: 1
  // view: Array []
  // x: 1
  // y: 19
  
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
    
    
    let facing, x, y;
    let hasChosenDirection = false;
    
    //while the creature has not moved yet
    while(!hasChosenDirection){

      // decide if the creature will turn
        // if yes, decide how much the creature will turn by
      // find the new cell
      // decide if the new cell is empty
        // if the cell is empty, check that other creatures aren't already moving there
        // if no other creatures are moving there, write the data to the creature and flag it as having moved
        // if the move is invalid, restart the process

      // if
        // the cell the critter is facing is blocked, turn
      // else
        // the cell is clear
        // random chance to turn
      let facedCell = gridArray[creature.y + creature.facing.y][creature.x + creature.facing.x];
      if (facedCell === "#" || facedCell === "b") {
        // turn
        let newFacing = CARDINAL_DIRECTIONS[Math.floor(Math.random()*8)]; 
        let testCell = gridArray[critter.y + newFacing.y][critter.x + newFacing.x];
        
        if (testCell === " ") {
          creature.facing = {x: newFacing.x, y: newFacing.y};
          creature.x = creature.x + newFacing.x;
          creature.y = creature.y + newFacing.y;
          hasChosenDirection = true;
        }
      }
      else if (facedCell === " ") {
        // cell is clear, random turn chance?
        creature.x = creature.x + creature.facing.x;
        creature.y = creature.y + creature.facing.y;
        hasChosenDirection = true;
      }

      let randomNumber = Math.floor(Math.random()*8);
      let newFacing = CARDINAL_DIRECTIONS[randomNumber]; 
      x = creature.x + newFacing.x;
      y = creature.y + newFacing.y;

      let chosenTile = gridArray[y][x];
      // if the chosen cell is empty
      if(chosenTile === " "){
        facing = {x: newFacing.x, y: newFacing.y};
        hasChosenDirection = true;
      }
    }
    return {...creature, facing, hasMoved, x, y};
  });
  
  return creatureArray;
}