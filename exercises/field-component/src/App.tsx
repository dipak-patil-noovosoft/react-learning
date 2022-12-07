import React from 'react';

import {observer} from "mobx-react-lite";
import UserDetailsform from "./Components/UserDetailsform/UserDetailsform";

function App() {
    return(
        <>
            <UserDetailsform/>
        </>
    )

}

export default observer(App);
