

export function CreatureTemplate(creatureType, x, y, hasMoved, facing = {x: 0, y:-1}, foodChain = 0, speed = 1, view = []) {
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

export class CreatureClass{
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
}