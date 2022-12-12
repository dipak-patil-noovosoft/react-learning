import React from 'react';

import {observer} from "mobx-react-lite";
import {RootStoreContextProvider} from "./Context/StoreContext/RootStoreContext";
import MultipleInputForm from "./Components/FielComponentExericse/MultipleInputForm/MultipleInputForm";
import ProductList from "./Components/listtTableStoreExericse/ProductList";

function App() {
    return (
        <RootStoreContextProvider>
            <MultipleInputForm/>
            {/*<ProductList/>*/}
        </RootStoreContextProvider>
    )

}

export default observer(App);
