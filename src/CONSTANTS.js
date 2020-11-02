// import { POPULATE_WORLD, TAKE_TURN, START_TIMER } from './actionCreators';

export const DEFAULT_PLAN = [
  "############################",
  "#      #    #      b      ##",
  "#      #    #              #",
  "#      ##                  #",
  "#                          #",
  "#        ######            #",
  "#             #            #",
  "#             #####        #",
  "#    b                     #",
  "#                          #",
  "#                          #",
  "#                    #     #",
  "#     ##      b      #     #",
  "#     ##         #   #     #",
  "#    ###          ####     #",
  "#   ## #                   #",
  "#   #   #           b      #",
  "#   #                      #",
  "#                          #",
  "#          #####           #",
  "##         #   #    ##     #",
  "###           ##     #     #",
  "#           ###      #     #",
  "#   ####                   #",
  "#   ##       b             #",
  "# b  #         b       ### #",
  "#    #                     #",
  "############################"
];

// const initialState = {
//   grid: [],
//   creatures: []
// }

export const DIRECTION_NAMES = "n ne e se s sw w nw".split(" ");

export const DIRECTIONS2 = {
  "n": {x: 0, y: -1}, //n
  "ne": {x: 1, y: -1}, //ne
  "e": {x: 1, y: 0},  //e
  "se": {x: 1, y: 1},  //se
  "s": {x: 0, y: 1},  //s
  "sw": {x: -1, y: 1},//sw
  "w": {x: -1, y: 0}, //w
  "nw": {x: -1, y: -1} //nw
}

export const DIRECTIONS = [
  {x: 0, y: -1}, //n
  {x: 1, y: -1}, //ne
  {x: 1, y: 0},  //e
  {x: 1, y: 1},  //se
  {x: 0, y: 1},  //s
  {x: -1, y: 1}, //sw
  {x: -1, y: 0}, //w
  {x: -1, y: -1} //nw
];

export default function rootReducer(state = initialState, action){
  switch(action.type){
    case POPULATE_WORLD:
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
      })

      return {grid: gridArray, creatures: creatureArray};

    case TAKE_TURN:
      let newCreatures = new Array(state.creatures.length).fill().map((creature, i) => {
        return Object.assign({}, state.creatures[i]);
      });
      let newGrid = new Array(state.grid.length).fill().map((row, i) => {
        return new Array(state.grid[i].length).fill().map((vector, j) => {
          return state.grid[i][j];
        })
      });

      newCreatures = updateCreatures(newCreatures, newGrid);
      newGrid = updateGrid(newCreatures, newGrid);

      // checkValidMoves(newCreatures, newGrid);

      return {grid: newGrid , creatures: newCreatures};

    case START_TIMER:
      return state;
    default:
      return state;
  }
}

// function checkValidMoves(creatureArray, gridArray){
//
//   creatureArray.forEach((creature, i) => {
//     let emptyTiles = [];
//
//     //check which nearby vectors are empty tiles
//     DIRECTION_NAMES.forEach((direction, j) => {
//       if(gridArray[DIRECTIONS2[direction].y+creature.y][DIRECTIONS2[direction].x+creature.x] === " "){
//         emptyTiles.push(DIRECTIONS2[direction]);
//       }
//     });
//
//     //check if other creatures are planning to move there too
//     debugger;
//   });
//
// }

//update the creatures array
export function updateCreatures(creatureArray, gridArray){
  
  let newCreatures = [];
  creatureArray.forEach((creature, i) => {

    while(!creature.hasMoved){
      let newView = DIRECTIONS[Math.floor(Math.random()*8)]; //use directions2? 
      let chosenTile = gridArray[creature.y+newView.y][creature.x+newView.x];
      if(chosenTile === " "){
        let newVector = {x: creature.x+newView.x, y: creature.y+newView.y}

        //vvv NO FUNCTION vvv
        let allClear = false;
        for(let j = 0; j < i; j++){
          allClear = (newVector.x !== (newCreatures[j].x+newCreatures[j].facing.x) && newVector.y !== (newCreatures[j].y+newCreatures[j].facing.y));
        }
        // ^^^ NO FUNCTION ^^^

        creature.facing = {x: newView.x, y: newView.y};
        creature.hasMoved = true;
      }
    }
    newCreatures.push(creature);
  });
  
  return newCreatures;
}

//update the grid and creatures arrays
export function updateGrid(newCreatures, newGrid){
  newCreatures.forEach((creature, i) => {
    newGrid[creature.y+creature.facing.y][creature.x+creature.facing.x] = creature.creatureType;
    newGrid[creature.y][creature.x] = " ";
    creature.x = creature.x + creature.facing.x;
    creature.y = creature.y + creature.facing.y;
    creature.hasMoved = false;
  });

  return newGrid;
}
