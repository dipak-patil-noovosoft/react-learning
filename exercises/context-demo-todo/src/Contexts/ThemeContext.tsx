import React,{createContext} from "react";
 const themes = {
    isLightTheme :true,
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};
const ThemeContext = createContext({themes,toggle:()=>{}});
export   {ThemeContext,themes}
