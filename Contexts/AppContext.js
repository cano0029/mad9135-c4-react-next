import React, {createContext, useReducer} from "react";
import AppReducer from './AppReducer'
import data from '../datasource/data'

//inital state 
const initialState = data

//create context 
export const AppContext = createContext(initialState)

//Provider Component 
export const AppProvider = ({children}) =>{
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={state.data}>
      {children}
    </AppContext.Provider>
  )
}