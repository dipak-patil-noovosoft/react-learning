import React, {useEffect, useState} from 'react';
import './Navbar.css'
interface INavprops{
    search : (e:React.ChangeEvent<HTMLInputElement>)=>void,
    searchtext : string,
    changeCategory : (e:React.ChangeEvent<HTMLSelectElement>) =>void;
}
export const NavBar:React.FC<INavprops> = (props) => {

    const [category, setCategory] = useState([]);
    const {search,searchtext,changeCategory} = props;
    useEffect(() => {
        const getAllCategory = async () =>{
            const response = await  fetch(`https://dummyjson.com/products/categories`)
            const data = await  response.json();
            setCategory(data)
        }
        getAllCategory()

    }, []);



    return (
        <nav className="navBar">
            <input className="searchInput" value={searchtext} type="text" onChange={search}/>
            <label htmlFor="products">Category</label>

            <select name="products" id="products" onChange={changeCategory}>
                {category.map((e,index)=>{
                    return <option key={index} value={e}>{e}</option>
                })}
            </select>

        </nav>
    );
};