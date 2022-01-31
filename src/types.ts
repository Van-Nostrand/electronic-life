export interface ICritterProps {
  classString: string;
  critterType: string;
  foodChain: number;
  position?: ICoordinates;
  x?: number;
  y?: number;
  facing: IRelativeCoordinates;
  speed: number;
}

export interface ICritter extends ICritterProps {
  setPosition (newPos: ICoordinates): void;
  setFacing (newFacing: ICoordinates): void;
  takeTurn (): void;
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



export interface IWallFollower extends ICritter {
  hasFoundWall: boolean;
  wallCoordinate: {coordinates: {x: number; y: number;}, radius: number;};
  movesClockwise: boolean;

}

export type ICritterElement = {
  x: number;
  y: number;
  tileSize: number;
  classString: string;
}

export type IWorldProps = {
  worldMap: Array<Array<string>>;
  critters: Array<ICritterProps>;

}

export interface ICoordinates {
  x: number;
  y: number;
}

// use radius and coordinates to describe how far from a point another point is, and in which direction
export interface IRelativeCoordinates {
  coordinates: ICoordinates;
  radius: number;
}
