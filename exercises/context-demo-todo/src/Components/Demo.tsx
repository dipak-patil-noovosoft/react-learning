import React, {useContext} from 'react';
import {ThemeContext} from "../Contexts/ThemeContext";
function Demo() {
    const context = useContext(ThemeContext);
    const {themes} = context;
    const {light,isLightTheme,dark} = themes
    const theme = isLightTheme?light:dark;
    console.log(isLightTheme,theme)
    return (
        <div style={{height:"300px",color:theme.foreground,backgroundColor:theme.background}}>
            <h1>dipak</h1>
        </div>
    );
}

export default Demo;