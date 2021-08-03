import { CreatureProps, Properties } from '../types';

// x and y are indices, so account for 0!!
export function CreatureTemplate(creatureType, x, y, hasMoved = false, facing = {x: 0, y:-1}, foodChain = 0, speed = 1, view = []) {
  return {
    creatureType,
    x,
    y,
    hasMoved,
    facing,
    foodChain,
    speed,
    view
  };
}

export class Creature {
  creatureType: string;
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  };
  foodChain: number;
  speed: number;
  
  constructor(properties: Properties) {
    this.creatureType = properties.creatureType || "b"; 
    this.x = properties.x || -1; 
    this.y = properties.y || -1; 
    this.facing = properties.facing || {x: -1, y: -1}; 
    this.foodChain = properties.foodChain || 0; 
    this.speed = properties.speed || 1;
  }

  getLocation() {
    return { x: this.x, y: this.y };
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  getFacing() {
    return this.facing;
  }

  setFacing(x, y) {
    this.facing = {x, y};
  }

  getFoodChain() {
    return this.foodChain;
  }

  getType() {
    return this.creatureType;
  }

  getSpeed() {
    return this.speed;
  }

  getClassString() {
    let str;
    switch(true) {
      case this.creatureType === "b":
        str = "creature bouncing-critter"
    }
  }
}
