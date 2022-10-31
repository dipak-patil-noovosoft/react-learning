import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "./Components/App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App></App>
    </React.StrictMode>
);
//hi vishva, i am trying to use Usereducer, but it only expect expext 3 paremetr not 2