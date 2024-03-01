import React, { createContext, useEffect, useReducer, useState } from 'react';
const initialState = {
    watchLater: localStorage.getItem('watchLater') ? JSON.parse(localStorage.getItem('watchLater')) : [],
    watchHistoryList: []
}
export const userContext = createContext(initialState);
const reducer = (state, action) => {
    switch (action.type) {
        case "Add_Movie_To_WatchLater":
            return {
                ...state,
                watchLater: [...state.watchLater, action.payload.movie]
            }
        case "Remove_Movie_From_WatchLater":
            return {
                ...state,
                watchLater: state.watchLater.filter((ele) => (ele.id !== action.payload.id))
            }
        case "Add_Movie_To_WatchHistory":
            return {
                ...state,
                watchHistoryList: [...state.watchHistoryList, action.payload.movies]
            }
        case "Remove_Movie_From_WatchHistory":
            return {
                ...state,
                watchHistoryList: state.watchHistoryList.filter((ele) => ele.id !== action.payload.id)
            }
        default:
            return state;
    }
}

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem('watchLater', JSON.stringify(state.watchLater))
    }, [state])
    return (
        <>
            <userContext.Provider value={{ state, dispatch}}>
                {children}
            </userContext.Provider>
        </>
    )
}

export default GlobalContext;
