import {useEffect, useState} from "react";
const useProduct = (search:string,category:string) =>{


    const [product, setProducts] = useState([]);
    useEffect(() => {

    const getAllProduct = async () =>{
        const response = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=500`);
        let data = await response.json();
        setProducts(data.products.filter((e:any)=> {
            if (category === 'All') return true;
            return e.category === category;
        }));

    }
    getAllProduct();
}, [search,category]);
return product;
}

export default useProduct;