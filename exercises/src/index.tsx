import React from 'react'
import ReactDOM from 'react-dom/client'
import Tick from './Components/RenderUpdateElement'
import HandleEvent from "./Components/HandleEvent/HandleEvent";
import LifeCycleMethods from "./Components/LifeCycleMethods/LifeCycleMethods";
// import TickTacToe from "./Components/TicTacToe/TicTacToe";
// import LiftingStateUp from "./Components/LiftingStateUp";
const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);
root.render(
    <div>

        <Tick></Tick>
        {/*<LiftingStateUp/>*/}
        {/*<TickTacToe/>*/}
        {/*<HandleEvent/>*/}
        <LifeCycleMethods/>
    </div>
)