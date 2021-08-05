
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
      // if the coordinate exceeds the world map
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
  let direction, surroundings, wallCoordinates;
  let wallCoordArray = [];
  let wallFound = false;
  let radius = 1;

  do {
    // get the critters surroundings
    surroundings = viewAllSurroundingTiles(critter, worldMap, radius);
    // check each tile for a wall 
    // todo - write a function that checks all of the "border" indices of a 2d array
    surroundings.forEach((row, y) => row.forEach((tile, x) => {
      if (tile === "#") {
        wallFound = true;
        wallCoordArray.push(`${x},${y}`);
      }
    }));
    // if no wall was found, increase search radius
    if (!wallFound) radius += 1;

  } while (!wallFound);

  // surroundings contains the nearest wall
  /*
    the critter will find the wall by looking forwards to the end of surroundings and then checking side to side tiles
    critter.facing = {x: 0, y: -1}
    if radius was 3, we would need to check surroundings[0][3]
    how do I get there?
    critter is facing 0,-1, and need to check coordinate 2,0
    if radius is 3 then it looks like this
    
    #######
    #-----#
    #-----#
    #--c--#
    #-----#
    #-----#
    #######

    radius is 2 then it looks like
    #####
    #---#
    #-c-#
    #---#
    #####

    and facing 0,-1 we would need to check 2,0
    if facing 0,1 we would need to check 2,4

    so a formula would look like
    y = radius + (facing.y * radius) ?
    x = radius + (facing.x * radius) ?

    say facing 1,1, we would need to check 4,4
    y = 2 + (1 * 2) = 4
    x = 2 + (1 * 2) = 4

    say facing -1,1, we would need to check 0,4
    y = 2 + (1 * 2) = 4
    x = 2 + (-1 * 2) = 0

    say facing -1,0, checking 0,2
    y = 2 + (0 * 2) = 2,
    x = 2 + (-1 * 2) = 0
  */
  let testX = radius + (critter.facing.x * radius);
  let testY = radius + (critter.facing.y * radius);
  let testCell = surroundings[testY][testX];
  if (testCell === "#") {
    //wall found
  }
  else {
    // test cells beside it
    /*
      if facing is 0,-1, we're looking at 2,0 and need to test 1,0 and 3,0
    */
    let directionFound = false;
    let spread = 1;
    // test counter clockwise
    let counterCW = {y: testY, x: testX - spread};
    let clockW = {y: testY, x: testX + spread};
    if (counterCW.x < 0 || clockW.x > surroundings.length - 1) {
      // rotate perspective
    }
    else {
      let cCWTest = surroundings[counterCW.y][counterCW.x];
      let cWTest = surroundings[clockW.y][clockW.x];
    }
  }
  return direction;
}

export const checkBorderOf2dArray = (twoDeeArr, valueToFind, startingPoint = {x: 0, y: -1}, moreThanOneValue = false) => {

  // in theory, I should never be passing in an array with an even number of indices
  if ((twoDeeArr.length - 1) % 2 > 0) {
    return null;
  }
  /*
    say I'm given a 2d array of size 5*5

    oo###
    oooo#
    oooo#
    #ooo#
    #####

  */
  // need to get coordinate 2,0 from startingPoint 0,-1
  let radius = (twoDeeArr.length - 1) / 2; // the 2d array will always be an odd number length so this works... 
  
  let startX = startingPoint.x === 0 ? radius : startingPoint.x > 0 ? radius * 2 : 0;
  let startY = startingPoint.y === 0 ? radius : startingPoint.y > 0 ? radius * 2 : 0;
  let iter = 1;
  let maxChecks = (twoDeeArr.length - 1) * 4;
  let counterCW = {x: startX, y: startY};
  let clockW = {x: startX, y: startY}; 
  let directionFound = false;
  do {
    // do the single initial check
    if (iter === 1) {
      // if the first check is a wall, then that's the closest wall
      if (twoDeeArr[startY][startX] === valueToFind) {
        return ({x: startX, y: startY});
      }
      else {
        counterCW = getCounterClockwiseCoordinate(counterCW.x, counterCW.y, twoDeeArr.length);
        clockW = getClockwiseCoordinate(clockW.x, clockW.y, twoDeeArr.length);
      }
    }
    // else, we're iterating through ccw and cw checks
    else {

    }
    iter += 1;
  } while (!directionFound && iter <= maxChecks)
  
}

const getCounterClockwiseCoordinate = (x, y, arrayLength) => {
  // first step is to determine which coordinate value is going to change
  // if the coordinate is the top left or bottom right corner
  if (y === x) {
    if (y === 0) return ({x: 0, y: y + 1});
    else if (y === arrayLength - 1) return ({x: arrayLength - 1, y: y - 1});
  }
  
  // now I can just check individual numbers
  // if y is 0 then its top row
  if (y === 0) {
    return ({x: x - 1, y: 0});
  }
  // bottom row
  else if (y === arrayLength - 1) {
    return ({x: x + 1, y: arrayLength - 1});
  }
  // left column
  else if (x === 0) {
    if (y === arrayLength - 1) return ({x: x + 1, y: arrayLength -1});
    else return ({x: 0, y: y + 1});
  }
  // right column
  else if (x === arrayLength - 1) {
    return ({x: arrayLength - 1, y: y - 1});
  }
}

// todo - this is just the ccw function copied over, rewrite it for clockwise.
const getClockwiseCoordinate = (x, y, arrayLength) => {
  // if the coordinate is the top left or bottom right corner
  if (y === x) {
    if (y === 0) return ({x: x + 1, y: y});
    else if (y === arrayLength - 1) return ({x: x - 1, y: y});
  }
  
  // now I can just check individual numbers
  // if y is 0 then its top row
  if (y === 0) {
    return ({x: x + 1, y: y});
  }
  // bottom row
  else if (y === arrayLength - 1) {
    if (x === 0) return ({x: x, y: y - 1});
    else return ({x: x - 1, y: y});
  }
  // left column
  else if (x === 0) {
    return ({x: x, y: y - 1});
  }
  // right column
  else if (x === arrayLength - 1) {
    return ({x: x, y: y + 1});
  }
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


