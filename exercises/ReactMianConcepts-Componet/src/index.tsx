import React from 'react'
import ReactDOM from 'react-dom/client'
import Tick from './Components/RenderUpdateElement'
import LifeCycleMethods from "./Components/LifeCycleMethods/LifeCycleMethods";
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