export const CreatureTemplate = ({creatureType, x, y, hasMoved, facing, foodChain, speed}) => {
  return new Object({
    creatureType,
    x,
    y,
    hasMoved,
    facing,
    foodChain,
    speed
  });
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