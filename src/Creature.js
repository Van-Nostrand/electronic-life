
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

// Don't think I'll be using this...
export class Creature{
// export class Creature{
  constructor(props){
    this.state = {
      creatureType: props.creatureType, 
      x: props.x, 
      y: props.y, 
      hasMoved: props.hasMoved, 
      facing: props.facing, 
      foodChain: props.foodChain, 
      speed: props.speed
    }
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