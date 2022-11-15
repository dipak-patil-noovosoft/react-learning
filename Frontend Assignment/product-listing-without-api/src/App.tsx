import React from 'react';
import './App.css'
import {RouterContext, RouterView} from "mobx-state-router";
import {initRouter} from "./Routing/initRouter";
import {viewMap} from "./Routing/viewmap";
import {StoreContextProvider} from "./StoreContext/StoreContext";
import NavBar from "./Components/Navbar/NavBar";

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
                    <NavBar/>
                    <RouterView viewMap={viewMap} />
                </RouterContext.Provider>
            </StoreContextProvider>
        );
    }
}

export default App;