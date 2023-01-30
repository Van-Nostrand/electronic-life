import React, { ReactNode, createContext, useMemo, useReducer } from 'react'
import { initialState, IContext } from './initialState'
import { actions } from './actions'
import reducer from './reducer'


interface IProvider {
  state: IContext
  dispatch: React.Dispatch<any>
  updateTileSize: (ts: number) => void
}
export const WorldContext = createContext<IProvider>(undefined)

export default function WorldProvider ({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => {
    return { ...actions(state, dispatch) }
  }, [state])

  return (
    <WorldContext.Provider value={value}>
      { children }
    </WorldContext.Provider>
  )
}
