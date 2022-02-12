import { ICritterProps } from '@/critters/types'
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

export type ICritterElementProps = {
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
