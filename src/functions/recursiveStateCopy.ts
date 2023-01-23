// this will deep copy objects and arrays
// I think it's borked if you pass in any built in weird javascript class instances or Date objects, nodelists, things like that.
// but it can handle Arrays, Objects, Number, String, Boolean, and functions
// it probably won't work with react components
export const recursiveStateCopy = (oldState: any): any => {
  if (thisIsPrimitive(oldState) || typeof oldState === 'function') return oldState
  let newState: any
  if (Array.isArray(oldState)) {
    newState = oldState.map(value => {
      return recursiveStateCopy(value)
    })
  } else if (thisIsAPlainObject(oldState)) {
    // this is a boring-ass object
    newState = {}
    Object.keys(oldState).forEach(key => {
      newState[key] = recursiveStateCopy(oldState[key])
    })
  } else if (thisIsASpecialObject(oldState)) {
    // it's an object, but it didn't pass the plain object test above
    // so this object must be an instance of some special class
    // I haven't tested this thoroughly... it seems too easy
    return Object.assign(Object.create(Object.getPrototypeOf(oldState)), oldState)
  }
  return newState
}

const thisIsASpecialObject = (thing: any) => {
  return typeof thing === 'object'
}

const thisIsAPlainObject = (thing: any) => {
  return Object.getPrototypeOf(thing).constructor.name === 'Object'
}

const thisIsPrimitive = (thing: any) => {
  return typeof thing === 'string' || typeof thing === 'number' || typeof thing === 'boolean'
}
