import { CoordinatesInterface } from '../../types';

export default class Critter {
  x: number;
  y: number;
  facing: CoordinatesInterface;
  foodChain: number;
  speed: number;
  critterType: string;
  classString: string;

  constructor(x, y, facing, foodChain, speed, critterType) {
    this.x              = x; 
    this.y              = y; 
    this.facing         = facing; 
    this.foodChain      = foodChain; 
    this.speed          = speed;
    this.critterType    = critterType; 
    this.classString    = 'critter';
  }

  setPosition(newPos: {x: number; y: number;}): void {
    this.x = newPos.x;
    this.y = newPos.y;
  };

  setFacing(newFacing: {x: number; y: number;}): void {
    this.facing = newFacing;
  }

  takeTurn(): void {};

}