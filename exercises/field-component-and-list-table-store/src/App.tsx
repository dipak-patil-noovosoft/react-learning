import React from 'react';

import {observer} from "mobx-react-lite";
import {RootStoreContextProvider} from "./Context/StoreContext/RootStoreContext";
import {RouterContext, RouterView} from "mobx-state-router";
import {initRouter} from "./Routing/initRouter";
import {viewMap} from "./Routing/viewMap";
import NavBar from "./Components/NavBar/NavBar";

const routerStore = initRouter();

function App() {
    return (
        <RootStoreContextProvider>
            <RouterContext.Provider value={routerStore}>
                <NavBar/>
                <RouterView viewMap={viewMap}/>
            </RouterContext.Provider>
        </RootStoreContextProvider>
    )

}

export default observer(App);
