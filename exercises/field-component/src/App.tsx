import React from 'react';

import {observer} from "mobx-react-lite";
import UserDetailsform from "./Components/UserDetailsform/UserDetailsform";
import JsonInputComponent from "./Components/JsonInputComponent/JsonInputComponent";
import Inputs from "./Components/Inputs/Inputs";

function App() {
    return(
        <>
            {/*<UserDetailsform/>*/}
            <Inputs/>
        </>
    )

}

export default observer(App);
