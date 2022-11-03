import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes,Route,Link} from 'react-router-dom'
import Feed from "./Components/Feed/Feed";
import UserContextProvider from "./Context/UserContextProvider";
import Cart from "./Components/Cart/Cart";
import useUser from "./Components/CustomHooks/useUser";
import useCart from "./Components/CustomHooks/useCart";

function App() {

  return (
    <div className="App">
        <UserContextProvider>
            <Routes>
                    <Route path="/" element={<Feed/>}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
            </Routes>

        </UserContextProvider>
    </div>
  );
}

export default App;
