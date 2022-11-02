import React, {useEffect, useState} from 'react';
import ProductsItems from "./ProductsItems";
import {log} from "util";
import {NavBar} from "../NavBar/NavBar";
import useProduct from "../CustomHooks/useProducts";
import Product from "./Product";
import useUser from "../CustomHooks/useUser";
import useCart, {ICart} from "../CustomHooks/useCart";
export interface IProduct{
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}
function Feed() {
    const [searchProduct, setSearchProduct] = useState("");
    const [category, setCategory] = useState("All");

    const user = useUser();
    const cart = useCart(5);


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
            <Product search = {searchProduct} category={category} cart={cart}></Product>
        </div>
    );
}

export default Feed;