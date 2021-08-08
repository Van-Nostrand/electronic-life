export default class Critter {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  }
  foodChain: number;
  speed: number;
  creatureType: string;
  classString: string;

  constructor(x, y, facing, foodChain, speed, creatureType) {
    this.x              = x; 
    this.y              = y; 
    this.facing         = facing; 
    this.foodChain      = foodChain; 
    this.speed          = speed;
    this.creatureType   = creatureType; 
    this.classString    = 'critter';
  }
}