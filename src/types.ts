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
  takeTurn: Function
}

export interface IBouncingCritter extends ICritter {}

export interface IBouncingCritterProps extends ICritterProps {}

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

export type IWorldProps = {
  worldMap: Array<Array<string>>;
  critters: Array<ICritter>;

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

// export interface CreatureProps {
//   properties: {
//     critterType: string;
//     x: number;
//     y: number;
//     facing: {
//       x: number;
//       y: number;
//     };
//     foodChain: number;
//     speed: number;
//   }
// }

// export interface Properties {
//   critterType: string;
//   x: number;
//   y: number;
//   facing: {
//     x: number;
//     y: number;
//   };
//   foodChain: number;
//   speed: number;
// }
