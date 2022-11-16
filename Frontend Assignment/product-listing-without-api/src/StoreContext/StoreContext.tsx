import React from "react";
import RootStore from "../Stores/RootStore";

export const StoreContext = React.createContext<any>(null);

export const StoreContextProvider = (props:any) =>{
    return(
        <StoreContext.Provider value={new RootStore(props.routerStore)}>
            {props.children}
        </StoreContext.Provider>
    )
}