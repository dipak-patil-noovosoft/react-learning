import React, {useContext} from 'react';
import './Navbar.css'
import useCategories from "../CustomHooks/useCategories";
import {Link} from "react-router-dom";
import userContext from "../../Context/UserContext";

interface INavprops{
    onSearch : (e:React.ChangeEvent<HTMLInputElement>)=>void,
    searchItem : string,
    changeCategory? : (e:React.ChangeEvent<HTMLSelectElement>) =>void;
    changeUser : (e:React.ChangeEvent<HTMLSelectElement>) =>void;
    userList:any
}
export const NavBar:React.FC<INavprops> = (props) => {

    const {onSearch,searchItem,changeCategory,userList,changeUser} = props;
    const user = useContext(userContext);
    const locatStorage = localStorage.getItem(JSON.stringify(user.user.id));
    let cartCount = 0
    if (locatStorage){
        const carts = JSON.parse(locatStorage);
        cartCount = carts.cartItems.length;
    }

    const category = useCategories();
    return (
        <nav className="navBar">
            <div className="searchInput">
                <input className="searchInput" value={searchItem} type="text" onChange={onSearch}/>
            </div>
            <div className="categories">
                <label htmlFor="products">Category</label>
                <select name="products" id="products" onChange={changeCategory}>
                    {category.map((e, index) => {
                        return <option key={index} value={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="cart">
                <Link to={"/cart"}>

                <h4>{user.user.firstName}'s cart</h4>
                <span>{cartCount} items</span>
                </Link>
            </div>
            <div className="usersDropDown">
                <label htmlFor="products">users</label>

                <select  name="users" id="users" onChange={changeUser}>
                    {userList.map((users:any)=>{
                        return <option key={users.id} value={users.id}>{users.firstName}</option>
                    })}
                </select>
            </div>

        </nav>
    );
};