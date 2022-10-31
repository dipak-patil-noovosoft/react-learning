import React,{useContext} from 'react';
import {themeContext} from "../Context/ThemeContext";
const UseContext = () => {
    const themes = useContext(themeContext);
    const{theme,change} = themes;
        console.log(theme)
    return (
        <div style={{color:theme.foreground,background:theme.background}}>
            <h1>hello   </h1>
            <button type="submit" onClick={change}>Change Theme</button>
        </div>
    );
};
export default UseContext;