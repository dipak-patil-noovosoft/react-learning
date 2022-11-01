// @flow
import React, {useState} from 'react';
import {themes,ThemeContext} from './ThemeContext'
export const ThemeContextProvider = (props:any) => {
    const [theme, setTheme] = useState(themes);
    const toggle = () =>{
        setTheme({...theme,isLightTheme: !theme.isLightTheme})
    }
    return (
        <ThemeContext.Provider value={{themes:theme,toggle : toggle}}>
            {props.children}
        </ThemeContext.Provider>
    );
};