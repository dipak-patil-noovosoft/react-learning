import React from 'react';

import {observer} from "mobx-react-lite";
import Inputs from "./Components/Inputs/Inputs";

function App() {
    return (
        <>
            <Inputs/>
        </>
    )

}

export default observer(App);
