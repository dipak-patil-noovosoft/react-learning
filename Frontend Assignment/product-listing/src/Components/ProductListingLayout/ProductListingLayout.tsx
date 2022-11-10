import React, {Dispatch, useContext, useReducer} from 'react';
import {Outlet} from "react-router-dom";
import {NavBar} from "../NavBar/NavBar";
import {IReducerState} from "../types";
import userContext from "../../Context/UserContext";
import useCart from "../CustomHooks/useCart";

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
    cart : ReturnType<typeof useCart>
}

function ProductListingLayout() {
    const [state, dispatch] = useReducer(reducer, {search:'',category:'All'});
    const {user} = useContext(userContext);
    const cart = useCart(user.id);
    return (
        <>
            <NavBar
                state={state}
                dispatch={dispatch}
            />
            <Outlet context={{state,dispatch,cart}}/>
        </>
    );
}

export default ProductListingLayout;