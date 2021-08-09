export interface CreatureProps {
  properties: {
    critterType: string;
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
  critterType: string;
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  };
  foodChain: number;
  speed: number;
  
}

export interface CritterInterface {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  }
  foodChain: number;
  speed: number;
  critterType: string;
}

export interface WallFollowerInterface extends CritterInterface {
  hasFoundWall: boolean; // wrong
}

export type CritterElementInterface = {
  x: number;
  y: number;
  tileSize: number;
  classString: string;
}

export type WorldProps = {
  worldMap: Array<any>;
  critters: Array<CritterInterface>;

}

export interface CoordinatesInterface {
  x: number;
  y: number;
}

// use radius and coordinates to describe how far from a point another point is, and in which direction
export interface RelativeCoordinatesInterface {
  coordinates: CoordinatesInterface;
  radius: number;
}