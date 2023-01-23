import { ICritterProps, ICritter } from '@/types'

// export function Creature (this: ICritter, properties: ICritterProps) {
//   this.creatureType   = properties.creatureType || 'b'
//   this.x              = properties.x || -1
//   this.y              = properties.y || -1
//   this.facing         = properties.facing || { x: -1, y: -1 }
//   this.foodChain      = properties.foodChain || 0
//   this.speed          = properties.speed || 1
//   this.view = undefined

//   // are any of these methods necessary?
//   this.getLocation = function () {
//     return { x: this.x, y: this.y }
//   }

//   this.setLocation = function (x: number, y: number) {
//     this.x = x
//     this.y = y
//   }

//   this.getFacing = function () {
//     return this.facing
//   }

//   this.setFacing = function (x: number, y: number) {
//     this.facing = { x, y }
//   }

//   this.getFoodChain = function () {
//     return this.foodChain
//   }

//   this.getType = function () {
//     return this.creatureType
//   }

//   this.getSpeed = function () {
//     return this.speed
//   }

//   this.getClassString = function () {
//     let str
//     switch (true) {
//       case this.creatureType === 'b':
//         str = 'creature bouncing-critter'
//     }
//     return str
//   }
// }
export class Creature implements ICritter {
  creatureType: string
  x: number
  y: number
  facing?: {
    x: number;
    y: number;
  }
  foodChain?: number
  speed?: number
  view?: any

  constructor (properties: ICritterProps) {
    this.creatureType = properties.creatureType || 'b'
    this.x = properties.x || -1
    this.y = properties.y || -1
    this.facing = properties.facing || { x: -1, y: -1 }
    this.foodChain = properties.foodChain || 0
    this.speed = properties.speed || 1
  }

  // are any of these methods necessary?
  getLocation () {
    return { x: this.x, y: this.y }
  }

  setLocation (x: number, y: number) {
    this.x = x
    this.y = y
  }

  getFacing () {
    return this.facing
  }

  setFacing (x: number, y: number) {
    this.facing = { x, y }
  }

  getFoodChain () {
    return this.foodChain
  }

  getType () {
    return this.creatureType
  }

  getSpeed () {
    return this.speed
  }

  getClassString () {
    let str
    // todo - add more class strings
    switch (true) {
      case this.creatureType === 'b':
        str = 'creature bouncing-critter'
    }
    return str
  }
}
