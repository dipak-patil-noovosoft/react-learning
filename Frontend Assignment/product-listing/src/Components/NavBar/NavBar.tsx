import React from 'react';
import './Navbar.css'
import useCategories from "../CustomHooks/useCategories";
import {ICartProducts} from "../types";

interface INavprops{
    onSearch? : (e:React.ChangeEvent<HTMLInputElement>)=>void,
    searchItem? : string,
    changeCategory? : (e:React.ChangeEvent<HTMLSelectElement>) =>void;
    user? : {id:number, firstName :string}
    cart ?:ICartProducts[]
}
export const NavBar:React.FC<INavprops> = (props) => {

    const {onSearch,searchItem,changeCategory,user,cart} = props;
    let cardItemCount = (cart?.length)
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
                <h4>{user?user.firstName:''}'s cart</h4>
                <span>{cardItemCount} items</span>
            </div>

        </nav>
    );
};