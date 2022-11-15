import React from "react";
import RootStore from "../Stores/RootStore";

export const StoreContext = React.createContext(new RootStore());

export const StoreContextProvider = (props:any) =>{
    return(
        <StoreContext.Provider value={new RootStore(props.rootStore)}>
            {props.children}
        </StoreContext.Provider>
    )
}