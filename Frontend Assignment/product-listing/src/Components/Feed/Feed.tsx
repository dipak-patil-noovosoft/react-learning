import React, {useContext, useEffect, useState} from 'react';
import {NavBar} from "../NavBar/NavBar";
import Product from "./Product";
import useUser from "../CustomHooks/useUser";
import  useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";
import Cart from "../Cart/Cart";

function Feed() {

    const userCont = useContext(userContext);


    const [searchProduct, setSearchProduct] = useState("");
    const [category, setCategory] = useState("All");
    const [users, setUsers] = useState([{id:1,firstName:""}]);
    const [currentUser, setCurrentUser] = useState(1);


    useEffect(() => {
        const getAllUsers = async () =>{
            const response = await fetch(`https://dummyjson.com/users`);
            const usersData = await response.json();
            setUsers(usersData.users);
        }
        getAllUsers();
    }, []);


    const user = useUser(currentUser);
    const {cart,addToCart,removeFromCard} = useCart(user.id);
    useEffect(() => {
        userCont.setCurrentUser(user);
    }, [user]);

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearchProduct(e.target.value)
    }
    const handleCategory = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setCategory(e.target.value);
    }
    const changeUser = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setCurrentUser(parseInt(e.target.value))
    }
    return (
        <div>
            <NavBar  searchItem={searchProduct}  onSearch={handleSearch}  changeCategory={handleCategory}
                     user = {user}
                     userList = {users}
                     cart={cart}
                     changeUser ={changeUser}
            ></NavBar>
            <Product user = {user} search = {searchProduct} category={category} cart={cart} addToCart = {addToCart} removeFromCard={removeFromCard}></Product>
        </div>
    );
}

export default Feed;