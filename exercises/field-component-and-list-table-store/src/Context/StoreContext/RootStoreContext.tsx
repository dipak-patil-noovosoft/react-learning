import React from "react";
import RootStore from "../../Stores/RootStore";
import {initRouter} from "../../Routing/initRouter";

interface IRootStoreContextProps {
    children: React.ReactNode
}

const routerStore = initRouter();
const rootSore = new RootStore(routerStore)
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