import React from "react";
import RootStore from "../../Stores/rootStore";

interface IRootStoreContextProps {
    children: React.ReactNode
}

const rootSore = new RootStore()
export const RootStoreContext = React.createContext<RootStore>(rootSore);

export class RootStoreContextProvider extends React.Component<IRootStoreContextProps, any> {
    render() {
        return (
            <RootStoreContext.Provider value={rootSore}>
                {this.props.children}
            </RootStoreContext.Provider>
        )
    }
}