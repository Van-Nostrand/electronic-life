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

export type CritterType = {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  }
  foodChain: number;
  speed: number;
  creatureType: string;
}

export interface BouncingCritter {
  creatureType: string;
}

export type CritterElementProps = {
  x: number;
  y: number;
  tileSize: number;
  classString: string;
}