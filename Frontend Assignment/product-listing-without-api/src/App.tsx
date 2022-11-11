import React from 'react';
import './App.css'
import {RouterContext, RouterView} from "mobx-state-router";
import {initRouter} from "./Stores/initRouter";
import {viewMap} from "./Stores/viewmap";
import {StoreContextProvider} from "./Components/StoreContext";

class App extends React.Component<{}, {}> {
    routerStore

    constructor(props) {
        super(props);
        this.routerStore = initRouter();
    }

    render() {
        return (
            <StoreContextProvider rootStore={this.routerStore}>
                <RouterContext.Provider value={this.routerStore}>
                    <RouterView viewMap={viewMap} />
                </RouterContext.Provider>
            </StoreContextProvider>
        );
    }
}

export default App;