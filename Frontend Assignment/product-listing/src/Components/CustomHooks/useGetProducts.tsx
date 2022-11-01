import {useEffect} from "react";
import {IProduct} from "../Feed/Feed";
const useGetProduct = (setProducts:React.Dispatch<React.SetStateAction<IProduct[]>> ) =>{

useEffect(() => {
    const getAllProduct = async () =>{
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
    }
    getAllProduct();
}, []);
}

export default useGetProduct;