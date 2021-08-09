import Critter from './Critter';

export default class BouncingCritter extends Critter {
  
  constructor(x: number, y: number, facing: {x: number; y: number;}) {
    super(x, y, facing, 0, 1, "b");

    this.classString = 'critter bouncing-critter';
  }

  // bouncing critters are pretty simple
  // if they are facing an empty cell, then they move there
  // if they are not, then they will select a new random direction and see if that cell is clear
  // they will keep selecting random directions until they find a clear path
  // this can result in an infinite loop if they are boxed in by other critters, so I'll have to account for that soon. Maybe they can rest after 
  takeTurn(worldMap?: Array<Array<string>>): this | Error {
    if (worldMap === undefined) return new Error("Error in BouncingCritter.takeTurn");
    let hasChosenDirection: boolean = false;
    let newFacing: {x: number; y: number;} = {...this.facing};

    do {
      let facedCell: string = worldMap[this.y + newFacing.y][this.x + newFacing.x];
      // if the cell the critter is facing is not empty 
      if (facedCell !== " ") {
        // turn
        newFacing = {x: Math.floor(Math.random()*3) - 1, y: Math.floor(Math.random()*3) - 1};
      }
      // else the cell is a clear space
      else if (facedCell === " ") {
        hasChosenDirection = true;
      }
    } while (!hasChosenDirection);

    this.setPosition({x: this.x + newFacing.x, y: this.y + newFacing.y});
    this.setFacing(newFacing);
    return this;
  };
}
