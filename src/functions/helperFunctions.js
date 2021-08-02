
// todo - rewrite so this scales, accepts a radius as an argument and returns a field of view based on that size
  // will need to check that the radius does not exceed the world map
// todo - rename to getSurroundingTiles ??
export const viewAllSurroundingTiles = (critter, worldMap, radius = 1) => {
  
  // determine the x and y range
  let getRange = [radius * -1, radius];

  // copy those coordinates to a new map
  let arrayLength = (getRange[1] - getRange[0]) + 1; // plus one to account for index
  let surroundings = new Array(arrayLength).fill().map(() => new Array(arrayLength).fill(""));
  
  for (let i = getRange[0], y = 0; i <= getRange[1]; i++, y++) { 
    for (let j = getRange[0], x = 0; j <= getRange[1]; j++, x++) {
      // if the coordinate is the middle, where the critter is... 
      if (i === 0 && j === 0) {
        surroundings[y][x] = critter.creatureType;
      }
      else if (!worldMap[critter.y + i] || !worldMap[critter.y + i][critter.x + j]) {
        surroundings[y][x] = "X";
      }
      // else, return the world tile
      else {
        surroundings[y][x] = worldMap[critter.y + i][critter.x + j];
      }
    }
  }
  return surroundings;
}

// this will search the area around the critter for the nearest wall
export const findNearestWall = (critter, worldMap) => {
  let direction;
  let worldWidthY = worldMap.length;
  let worldWidthX = worldMap[0].length;

  return direction;
}

export const shouldCreatureTurn = (critter, area) => {

}



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


