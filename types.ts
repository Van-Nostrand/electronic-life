export interface CreatureProps {
  properties: {
    creatureType: string;
    x: number;
    y: number;
    facing: {
      x: number;
      y: number;
    };
    foodChain: number;
    speed: number;
  }
}

export interface Properties {
  creatureType: string;
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  };
  foodChain: number;
  speed: number;
  
}