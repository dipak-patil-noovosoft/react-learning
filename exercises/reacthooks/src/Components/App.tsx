import React, {useState} from 'react';
import { themes,themeType} from "../Context/ThemeContext";

import './App.css'
import UseCallback from "./UseCallback";
export const App : React.FC = () => {
    const [theme, setTheme] = useState(themes.light);
    const [themesType, setThemesType] = useState(themeType);

    return (
        <div>
            {/*<UseState/>*/}
            {/*<UseEffect/>*/}
            {/*<themeContext.Provider value={{themeType,theme,change: ()=>{*/}
            {/*        console.log(themesType)*/}
            {/*        if (themesType) {*/}
            {/*            setThemesType(false);*/}
            {/*            setTheme(themes.dark)*/}
            {/*        }*/}
            {/*        else{*/}
            {/*            setThemesType(true);*/}
            {/*            setTheme(themes.light)*/}
            {/*        }*/}
            {/*    } }}>*/}
            {/*    <UseContext/>*/}
            {/*</themeContext.Provider>*/}

            {/*<UseReducerDemo/>*/}
            {/*<CustomHook/>*/}
            {/*<UseRef/>*/}
            <UseCallback/>
        </div>
    );
};