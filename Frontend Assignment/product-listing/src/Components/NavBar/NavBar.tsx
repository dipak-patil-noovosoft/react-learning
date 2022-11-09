import React, {Reducer, useContext, useReducer, useState} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";
import userContext from "../../Context/UserContext";
import { IReducerState, IUser, IUsers} from "../types";
import {useFetch} from "../CustomHooks/useFetch";

interface INavProps{
    state : IReducerState
    dispatch : any
}

export const NavBar:React.FC<INavProps> = (props) => {
    const {user,setCurrentUser} = useContext(userContext);
    const {state,dispatch} = props;
    const localStorageCart = localStorage.getItem('cartDetails');
    let numberOfCartItems = 0
    if (localStorageCart){
        const carts = JSON.parse(localStorageCart);
        numberOfCartItems = carts?.[user.id]?.cartItems?.length ?? 0;
    }
    const changeUser = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setCurrentUser(parseInt(e.target.value));
    }

    const categories = useFetch<string[]>('/products/categories',['All'])
    const fetchUsers = useFetch<IUsers>('/users',{});
    
    const usersList :IUser[] = fetchUsers.users ?? [];

    return (
        <nav className="navBar">
            <div className='navItems'>
            <div className='homeLink'>
                <Link to='/'> <h2>Home</h2> </Link>
            </div>
                <div className="searchItem">
                    <div className='searchInputLabel'>
                        <label >Search Items</label>
                    </div>
                    <div className='searchInput'>
                        <input className="searchInput"  type="text" value={state.search} onChange={(e:any)=>{dispatch({type:'searchProduct',payload: e.target.value})}}/>
                    </div>
                </div>
                <div className="categories">
                    <div className='categoriesLabel'>
                        <label htmlFor="products">Category</label>
                    </div>
                    <div className='categoriesSelect'>
                        <select name="products" id="products"  onChange={(e)=>{dispatch({type:'searchByCategory',payload:e.target.value})}}>
                            <option value={'All'}>{'All'}</option>
                            {categories.map((e:any, index:number) => {
                                return <option key={index} value={e}>{e}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="cart">
                    <Link to={"/cart"}>

                        <h4>{user.firstName}'s cart</h4>
                    </Link>
                    <h4>{numberOfCartItems} items</h4>
                </div>
                <div className="usersDropDown">
                    <div className='usersDropDownLabel'>
                        <label htmlFor="products">users</label>
                    </div>
                    <div className='usersDropDownSelect'>

                    <select  name="users" id="users" value={user.id} onChange={changeUser}>
                        {usersList.map((users:IUser)=>{
                            return <option key={users.id} value={users.id}>{users.firstName}</option>
                        })}
                    </select>
                    </div>
                </div>
            </div>
        </nav>
    );
};