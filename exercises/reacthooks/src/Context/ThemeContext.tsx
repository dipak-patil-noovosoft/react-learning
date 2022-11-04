import {createContext} from "react";

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};
const themeType = true;
const themeContext = createContext({
    themeType : true,
    theme : themes.light,
    change: () => {
    }
});
export {themeContext, themes,themeType};