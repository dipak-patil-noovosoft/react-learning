import React, {Dispatch, useContext, useReducer} from 'react';
import {Outlet} from "react-router-dom";
import {NavBar} from "../NavBar/NavBar";
import {IReducerState} from "../types";

enum ReducerActions {
    searchProduct = 'searchProduct',
    searchByCategory = 'searchByCategory'
}

interface IActions {
    type: ReducerActions
    payload: string
}

const reducer:React.Reducer<IReducerState, IActions> = (state,action) => {
    switch (action.type){
        case  'searchProduct':
            return{...state,search :action.payload}
        case  'searchByCategory':
            return{...state,category :action.payload}
        default:
            return state
    }
}

export interface IOutletContext {
    state: IReducerState
    dispatch: Dispatch<ReducerActions>
}

function Main() {
    const [state, dispatch] = useReducer(reducer, {search:'',category:'All'});

    return (
        <>
            <NavBar
                state={state}
                dispatch={dispatch}
            />
            <Outlet context={{state,dispatch}}/>
        </>
    );
}

export default Main;