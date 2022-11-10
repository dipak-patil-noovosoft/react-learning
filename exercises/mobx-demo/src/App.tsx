import React from 'react';
import './App.css';
import Todo from "./Compnents/Todo";
import {TodoStoreProvider} from './Stores/TodoStore'
import Calc from "./Compnents/Calc";
function App() {
    return (
        <div className="App">
            <TodoStoreProvider>
                <Todo/>
                <Calc/>
            </TodoStoreProvider>
        </div>
    );
}

export default App;
