import React from 'react';
import './App.css';
import {ThemeContextProvider} from "./Contexts/ThemeContextProvider";
import {Todo} from "./Components/Todo";
import TodoContextProvider from "./Contexts/TodoContextProvider";

function App() {
  return (
      <div className="App">
        <ThemeContextProvider>
          {/*<Demo/>*/}
          {/*<Toggle/>*/}
          <TodoContextProvider>
            <Todo/>
          </TodoContextProvider>
        </ThemeContextProvider>
      </div>
  );
}

export default App;
