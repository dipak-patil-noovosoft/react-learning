import React from 'react';
import useProduct from "../CustomHooks/useProducts";
import ProductsItems from "./ProductsItems";
import {ICartProducts} from "../types";
interface IProductProps {
    search: string
    category: string
    cart: ICartProducts[]
    addToCart: (id: number) => void;
    removeFromCard: () => void
}
function compare (cart:ICartProducts[],e:ICartProducts){
    return cart.some((ct)=> (ct['id'] ===e['id']))
}
const  Product :React.FC<IProductProps> = (props) =>{
    const {search,category,cart,addToCart,removeFromCard} = props
    const products = useProduct(search,category);
    return (
        <div>
            {products.map((e)=>{
                return <ProductsItems key={e["id"]} product={e} addToCart={addToCart} removeFromCard={removeFromCard} status={compare(cart,e) } ></ProductsItems>
            })}
        </div>
    );
}

export default Product;