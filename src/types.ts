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

export interface ICritter {
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

export interface WallFollowerInterface extends ICritter {
  hasFoundWall: boolean;
  wallCoordinate: {coordinates: {x: number; y: number;}, radius: number;};
  movesClockwise: boolean;

}

export type CritterElementInterface = {
  x: number;
  y: number;
  tileSize: number;
  classString: string;
}

export type WorldProps = {
  worldMap: Array<any>;
  critters: Array<ICritter>;

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
