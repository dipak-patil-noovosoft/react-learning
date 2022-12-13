import React from 'react';

import {observer} from "mobx-react-lite";
import {RootStoreContextProvider} from "./Context/StoreContext/RootStoreContext";
import ProductList from "./Components/ListtTableStoreExericse/ProductList";

function App() {
    return (
        <RootStoreContextProvider>
            <ProductList/>
        </RootStoreContextProvider>
    )

}

export default observer(App);
