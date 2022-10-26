import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            
            return {
                users: [action.payload, ...state.users]
            }
        default:
            return state;
    }
}


export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        users: null
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}