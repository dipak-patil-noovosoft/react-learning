import React, {Reducer, useContext, useReducer, useState} from 'react';
import './Navbar.css'
import {Link, Outlet, useFetcher} from "react-router-dom";
import userContext from "../../Context/UserContext";
import {IProduct, IReducerState, IUser, IUsers} from "../types";
import {useFetch} from "../CustomHooks/useFetch";


interface INavprops{
    state : IReducerState
    dispatch : any
}



export const NavBar:React.FC<INavprops> = (props) => {
    const userCont = useContext(userContext);
    const {state,dispatch} = props;
    const localStorageCart = localStorage.getItem('cartDetails');
    let cartCount = 0
    if (localStorageCart){
        const carts = JSON.parse(localStorageCart);
        cartCount = carts?.[userCont.user.id]?.cartItems?.length ?? 0;
    }
    const changeUser = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        userCont.setCurrentUser(parseInt(e.target.value));
    }

    const category = useFetch<string[]>('/products/categories',['All'])
    const fetchUser = useFetch<IUsers>('/users',{});
    const userList :IUser[] = fetchUser.users ?? [];

    return (
        <nav className="navBar">
            <div className="searchInput">
                <input className="searchInput"  type="text" value={state.search} onChange={(e:any)=>{dispatch({type:'searchProduct',payload: e.target.value})}}/>
            </div>
            <div className="categories">
                <label htmlFor="products">Category</label>
                <select name="products" id="products"  onChange={(e)=>{dispatch({type:'searchByCategory',payload:e.target.value})}}>
                    <option value={'All'}>{'All'}</option>
                    {category.map((e:any, index:number) => {
                        return <option key={index} value={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="cart">
                <Link to={"/cart"}>

                <h4>{userCont.user.firstName}'s cart</h4>
                <span>{cartCount} items</span>
                </Link>
            </div>
            <div className="usersDropDown">
                <label htmlFor="products">users</label>
                <select  name="users" id="users" value={userCont.user.id} onChange={changeUser}>
                    {userList.map((users:IUser)=>{
                        return <option key={users.id} value={users.id}>{users.firstName}</option>
                    })}
                </select>
            </div>
        </nav>
    );
};