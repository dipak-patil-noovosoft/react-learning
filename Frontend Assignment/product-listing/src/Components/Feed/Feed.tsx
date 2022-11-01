import React, {useEffect, useState} from 'react';
import Products from "./Products";
import {log} from "util";
import {NavBar} from "../NavBar/NavBar";
import useGetProduct from "../CustomHooks/useGetProducts";
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
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchProduct, setSearchProduct] = useState(" ");
    //Custom Hook
    useGetProduct(setProducts);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setSearchProduct(e.target.value)
          const getAllProduct = async () =>{
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchProduct}`);
            const data = await response.json();
            if (data.products)setProducts(data.products);
        }
        getAllProduct();
    }
    const handleCategory = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        const category  = (e.target.value)
        const getAllProduct = async () =>{
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await response.json();
            if (data.products)setProducts(data.products);
        }
        getAllProduct();
    }

    return (
        <div>
            <NavBar search={handleChange} searchtext={searchProduct}  changeCategory={handleCategory}></NavBar>
            {products.map((e)=>{
                return <Products key={e["id"]} product={e} ></Products>
            })}
        </div>
    );
}

export default Feed;