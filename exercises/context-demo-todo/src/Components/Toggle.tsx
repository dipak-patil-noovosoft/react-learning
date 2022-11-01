import React, {useContext} from 'react';
import {ThemeContext} from "../Contexts/ThemeContext";

function Toggle() {
    const context = useContext(ThemeContext);
    const {themes,toggle} = context;
    const {light,isLightTheme,dark} = themes
    const theme = isLightTheme?light:dark;
    return (
        <button onClick={toggle}>Change Theme</button>
    );
}

export default Toggle;