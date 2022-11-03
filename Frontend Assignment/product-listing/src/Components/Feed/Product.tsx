import React, {useContext, useState} from 'react';
import useProduct from "../CustomHooks/useProducts";
import ProductsItems from "./ProductsItems";
import {ICartProducts, IProduct} from "../types";
import CartItems from "../Cart/CartItems";
import {NavBar} from "../NavBar/NavBar";
import useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";
interface IProductProps {
    search: string
    category: string
    cart: ICartProducts[]
    addToCart: (id: number) => void;
    user : {id:number, firstName :string}
    removeFromCard: (id:number) => void
}
function compare (cart:ICartProducts[],e:ICartProducts){
    return cart.some((ct)=> (ct['id'] ===e['id']))
}
const  Product :React.FC<IProductProps> = (props) =>{
    const [paginateCount, setPaginateCount] = useState(0);
    const {search,category,cart,user,addToCart,removeFromCard} = props
    // const {search,category,user} = props
    const products = useProduct(search,category);

    const cartItems = products.filter((ele:IProduct)=>cart.find(({id}) =>ele.id ===id));
    return (
        <div>
            {products.slice(paginateCount,paginateCount+5).map((e)=>{
                return <ProductsItems key={e["id"]} user={user} product={e} addToCart={addToCart} removeFromCard={removeFromCard} status={compare(cart,e) } ></ProductsItems>
            })}
            <button type="submit" onClick={()=>{
                if (paginateCount>1) setPaginateCount(paginateCount-5)
            }}>Preveus </button>
            <button type="submit" onClick={()=>setPaginateCount(paginateCount+5)} >Next</button>
        </div>
    );
}

export default Product;