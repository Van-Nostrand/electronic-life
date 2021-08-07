// export const DEFAULT_PLAN = [
//   "############################",
//   "#      #b   #             ##",
//   "#      #    #              #",
//   "#      ##                  #",
//   "#                          #",
//   "#        ######            #",
//   "#             #            #",
//   "#             #####        #",
//   "#    b                     #",
//   "#                          #",
//   "#                          #",
//   "#                    #     #",
//   "#     ##      b      #     #",
//   "#     ##         #   #     #",
//   "#    ###          ####     #",
//   "#   ## #                   #",
//   "#   #   #           b      #",
//   "#   #                      #",
//   "#                          #",
//   "#          #####           #",
//   "##         #   #    ##     #",
//   "###           ##     #     #",
//   "#           ###      #     #",
//   "#   ####                   #",
//   "#   ##       b             #",
//   "# b  #         b       ### #",
//   "#    #                     #",
//   "############################"
// ];
export const DEFAULT_PLAN = [
  "############",
  "#          #",
  "#          #",
  "#      #  ##",
  "#    b     #",
  "#      ##  #",
  "#    #     #",
  "#          #",
  "#          #",
  "#          #",
  "#          #",
  "############"
];

// export const DEFAULT_PLAN = [
//   "#####",
//   "#b  #",
//   "#   #",
//   "#####"
// ];

export const DIRECTION_NAMES = "n ne e se s sw w nw".split(" ");

export const DIRECTION_BY_STRING = {
  "n": { x: 0, y: -1 }, //n
  "ne": { x: 1, y: -1 }, //ne
  "e": { x: 1, y: 0 },  //e
  "se": { x: 1, y: 1 },  //se
  "s": { x: 0, y: 1 },  //s
  "sw": { x: -1, y: 1 },//sw
  "w": { x: -1, y: 0 }, //w
  "nw": { x: -1, y: -1 } //nw
}

export const DIRECTIONS = [
  { x: 0, y: -1 }, //n
  { x: 1, y: -1 }, //ne
  { x: 1, y: 0 },  //e
  { x: 1, y: 1 },  //se
  { x: 0, y: 1 },  //s
  { x: -1, y: 1 }, //sw
  { x: -1, y: 0 }, //w
  { x: -1, y: -1 } //nw
];

export const CARDINAL_STRING_FROM_COORDINATE = {
  "0,-1": "n",
  "1,-1": "ne",
  "1,0": "e",
  "1,1": "se",
  "0,1": "s",
  "-1,1": "sw",
  "-1,0": "w",
  "-1,-1": "nw"
}

export const getCardinalString = (x, y) => {
  if (x === 0) {
    if (y === 1) return "s";
    else return "n";
  }
  else if (x === 1) {
    if (y === 0) return "e";
    else if (y === 1) return "se";
    else if (y === -1) return "ne";
  }
  else if (x === -1) {
    if (y === 0) return "w";
    else if (y === 1) return "sw";
    else if (y === -1) return "nw";
  }
}

//this creates an array of length 8 representing 8 directions of travel
//each index is either true or false, representing if a creature can move there
export function creatureViews(creatureArray, gridArray) {
  creatureArray.forEach((creature, i) => {
    let surroundingArea = new Array(8).fill();
  
    surroundingArea.map((cell, n) => {
      let cellLocation = [creature.x + DIRECTIONS[n].x, creature.y + DIRECTIONS[n].y];
      let j = creatureArray.length - 1;
      for(let c = i + 1; c < j; c++){
        // if not occupied by creature - IGNORE FOR NOW
        // if((creatureArray[c].x === cellLocation[0])&&(creatureArray[c].y === cellLocation[1])) return false;
        // if not a wall
        if(gridArray[cellLocation[0]][cellLocation[1]] === "#" ) return false;
      }
      return true;
    });
    creatureArray[i].view = surroundingArea;
  });
}

//update the grid and creatures arrays
export function updateGrid(newCreatures, newGrid) {
  newCreatures.forEach((creature, i) => {
    newGrid[creature.x + creature.facing.x][creature.y + creature.facing.y] = creature.creatureType;
    newGrid[creature.x][creature.y] = " ";
    creature.x = creature.x + creature.facing.x;
    creature.y = creature.y + creature.facing.y;
  });

  return newGrid;
}
