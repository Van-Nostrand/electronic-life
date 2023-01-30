import { IContext } from './initialState'

interface IAction {
  payload?: any
  type: string
}

export default function reducer (state: IContext, action: IAction) {
  switch (action.type) {
    case 'update-tilesize':
      return {
        ...state, tileSize: action.payload
      }
    default: return state
  }
}
