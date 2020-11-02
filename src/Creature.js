export const Creature = ({creatureType, x, y, hasMoved, facing, foodChain, speed}) => {
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

// export class Creature{
//   constructor(props){
//     super(props);

//   }

//   return

// }