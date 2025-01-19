import React, { createContext, useReducer } from 'react'
import AdminReducer from '../reducers/admintReducer'

export const AdminContext = createContext()
export const AdminProvider = (props) => {

    const initialState = {
        users : [],
        agents : [],
        prompts : []
    }
    const [adminState , adminDispatch] = useReducer(AdminReducer , initialState)

  return (
    <div>
      <AdminContext.Provider value={{adminState , adminDispatch}}>
        {props.children}
      </AdminContext.Provider>
    </div>
  )
}


