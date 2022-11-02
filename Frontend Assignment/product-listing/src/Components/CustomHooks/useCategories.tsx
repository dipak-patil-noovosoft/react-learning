import {useEffect, useState} from "react";

const useCategories = () =>{

const [category, setCategory] = useState(['All']);

    useEffect(() => {
        const getAllCategory = async () =>{
            const response = await  fetch(`https://dummyjson.com/products/categories`)
            const data = await  response.json();
            setCategory(["All",...data])
        }
        getAllCategory()

    }, []);
    return category;
}

export default useCategories;
