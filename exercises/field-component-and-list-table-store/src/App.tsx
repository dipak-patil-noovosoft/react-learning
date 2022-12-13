import React from 'react';

import {observer} from "mobx-react-lite";
import {RootStoreContextProvider} from "./Context/StoreContext/RootStoreContext";
import {RouterContext, RouterView} from "mobx-state-router";
import {initRouter} from "./Routing/initRouter";
import {viewMap} from "./Routing/viewMap";

export const routerStore = initRouter();

function App() {
    return (
        <RootStoreContextProvider>
            <RouterContext.Provider value={routerStore}>
                <RouterView viewMap={viewMap}/>
            </RouterContext.Provider>
        </RootStoreContextProvider>
    )

}

export default observer(App);
