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