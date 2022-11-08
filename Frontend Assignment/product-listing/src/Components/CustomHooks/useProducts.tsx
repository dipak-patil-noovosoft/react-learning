import {useEffect, useState} from "react";
import {IProduct} from "../types";
const useProduct = (search:string = "",category:string= "All") =>{
    const [product, setProducts] = useState([]);
    useEffect(() => {
    const getAllProduct = async () =>{
        const response = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=100`);
        let data = await response.json();
        setProducts(data.products.filter((e:IProduct)=> {
            if (category === 'All') return true;
            return e.category === category;
        }));
    }
    getAllProduct();
}, [search,category]);
return product;
}

export default useProduct;