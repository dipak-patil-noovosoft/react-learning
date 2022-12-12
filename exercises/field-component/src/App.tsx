import React from 'react';

import {observer} from "mobx-react-lite";
import {RootStoreContextProvider} from "./context/StoreContext/RootStoreContext";
import MultipleInputForm from "./Components/FielComponentExericse/Inputs/MultipleInputForm";

function App() {
    return (
        <RootStoreContextProvider>
            <MultipleInputForm/>
            {/*<ProductList/>*/}
        </RootStoreContextProvider>
    )

}

export default observer(App);
