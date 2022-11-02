import React, {useEffect, useState} from 'react';
import ProductsItems from "./ProductsItems";
import {log} from "util";
import {NavBar} from "../NavBar/NavBar";
import useProduct from "../CustomHooks/useProducts";
import Product from "./Product";
import useUser from "../CustomHooks/useUser";
import  useCart from "../CustomHooks/useCart";
import {ICart} from "../types";
function Feed() {
    const [searchProduct, setSearchProduct] = useState("");
    const [category, setCategory] = useState("All");

    const user = useUser();
    const {cart,addToCart,removeFromCard} = useCart(user.id);

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearchProduct(e.target.value)
    }
    const handleCategory = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setCategory(e.target.value);
    }

    return (
        <div>
            <NavBar  searchItem={searchProduct}  onSearch={handleSearch}  changeCategory={handleCategory}
                      user = {user}
                     cart={cart}
            ></NavBar>
            <Product user = {user} search = {searchProduct} category={category} cart={cart} addToCart = {addToCart} removeFromCard={removeFromCard}></Product>
        </div>
    );
}

export default Feed;