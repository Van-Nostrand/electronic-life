import React, { createContext, useMemo, useReducer } from 'react'
import { initialState } from './initialState'
import { actions } from './actions'
import reducer from './reducer'

export const WorldContext = createContext({})

interface IProvider {
  // children: React.ReactNode;
  children: React.FC;
}

export default function WorldProvider ({ children }: IProvider) {
  const [ worldState, dispatch ] = useReducer(reducer, initialState)

  const value = useMemo(() => {
    return { ...actions(worldState, dispatch) }
  }, [worldState])

  return (
    <WorldContext.Provider value={value}>
      { children }
    </WorldContext.Provider>
  )
}
