import { FC } from 'react'

export interface ICritterProps {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  }
}

export interface ICritter {
  x: number;
  y: number;
  facing: {
    x: number;
    y: number;
  },
  takeTurn: () => this | Error
}

// export interface IBouncingCritter extends ICritter {}

// export interface IBouncingCritterProps extends ICritterProps {}

export interface IWallFollower extends ICritter {
  hasFoundWall: boolean;
  wallCoordinate: {coordinates: {x: number; y: number;}, radius: number;};
  movesClockwise: boolean;
}

export interface ICritterElementProps {
  x: number;
  y: number;
  tileSize: number;
  classString: string;
}

export interface ICritterElement extends FC {
  props: ICritterElementProps
}

export type TWorldMap = Array<Array<string>>

export type IWorldProps = {
  worldMap: TWorldMap
  critters: Array<ICritter>
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

