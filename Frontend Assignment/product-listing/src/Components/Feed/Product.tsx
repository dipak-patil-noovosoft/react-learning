import React from 'react';
import useProduct from "../CustomHooks/useProducts";
import ProductsItems from "./ProductsItems";
import {ICartProduct} from "../CustomHooks/useCart";
interface IProductProps{
    search:string
    category :string
    cart :ICartProduct[]

}
const  Product :React.FC<IProductProps> = (props) =>{
    const {search,category,cart} = props
    const products = useProduct(search,category);
    const ids = [1,2,4,6,7];
    return (
        <div>
            {products.map((e)=>{
                return <ProductsItems key={e["id"]} product={e} status={cart.some((ct)=> (ct['id'] ===e['id']))} ></ProductsItems>
            })}
        </div>
    );
}

export default Product;