
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
    
    let hasChosenDirection = false;
    //while the creature has not moved yet
    while(!hasChosenDirection){
      let facedCell = gridArray[creature.y + creature.facing.y][creature.x + creature.facing.x];
      if (facedCell === "#" || facedCell === "b") {
        // turn
        let newFacing = CARDINAL_DIRECTIONS[Math.floor(Math.random()*8)]; 
        creature.facing = { x: newFacing.x, y: newFacing.y };
      }
      else if (facedCell === " ") {
        // cell is clear, random turn chance?
        // console.log('src/functions/updateCreatures.js: creature is ', creature);
        // console.log('creature.x + creature.facing.x is ', creature.x + creature.facing.x);
        // console.log('creature.y + creature.facing.y is ', creature.y + creature.facing.y);
        creature.x = creature.x + creature.facing.x;
        creature.y = creature.y + creature.facing.y;
        creature.hasMoved = true;
        hasChosenDirection = true;
        // console.log('src/functions/updateCreatures.js: creature is ', creature);
      }
    }
    // todo - double check: I'm mutating the creature object, but it's from deep copied state... is that ok?
    return creature;
  });
  
  return creatureArray;
}