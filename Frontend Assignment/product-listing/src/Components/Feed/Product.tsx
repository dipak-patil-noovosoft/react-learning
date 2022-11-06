import React, {useContext, useState} from 'react';
import useProduct from "../CustomHooks/useProducts";
import ProductsItems from "./ProductsItems";
import {ICartProducts, IProduct} from "../types";
import userContext from "../../Context/UserContext";
interface IProductProps {
    search: string
    category: string
    addToCart: (id: number) => void;
    user : {id:number, firstName :string}
    removeFromCard: (id:number) => void
}
function compare (cart:ICartProducts[],e:ICartProducts){
    return cart.some((ct)=> (ct['id'] ===e['id']))
}
const  Product :React.FC<IProductProps> = (props) =>{
    const [paginateCount, setPaginateCount] = useState(0);
    const {search,category,user,addToCart,removeFromCard} = props
    const context = useContext(userContext)
    const locatStorageUser = (JSON.parse(localStorage.getItem(context.user.id.toString())??'{"cartItems":[]}'));
    const cart = locatStorageUser.cartItems;
    const products = useProduct(search,category);

    return (
        <div>
            {products.slice(paginateCount,paginateCount+5).map((e)=>{
                return <ProductsItems key={e["id"]} user={user} product={e} addToCart={addToCart} removeFromCard={removeFromCard} status={compare(cart,e) } ></ProductsItems>
            })}
            <div className="productsPagination">

            <button type="submit" onClick={()=>{
                if (paginateCount > 1) setPaginateCount(paginateCount-5)
            }}>Preveus </button>
            <button type="submit" onClick={()=>{
                if ((paginateCount + 5) < products.length)
                setPaginateCount(paginateCount+5)
            }} >Next</button>
            </div>
        </div>
    );
}

export default Product;