import React from 'react';
import useProduct from "../CustomHooks/useProducts";
import ProductsItems from "./ProductsItems";
import {ICartProducts, IProduct} from "../types";
import CartItems from "./CartItems";
import {NavBar} from "../NavBar/NavBar";
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
    const {search,category,cart,user,addToCart,removeFromCard} = props
    const products = useProduct(search,category);

    const cartItems = products.filter((ele:IProduct)=>cart.find(({id}) =>ele.id ===id));
    return (
        <div>
            {products.slice(0,5).map((e)=>{
                return <ProductsItems key={e["id"]} user={user} product={e} addToCart={addToCart} removeFromCard={removeFromCard} status={compare(cart,e) } ></ProductsItems>
            })}
            <h1 style={{textAlign:"center"}}>Cart</h1>
            {cartItems.map((e)=>{
                return <CartItems key={e["id"]} user={user} product={e} removeFromCard={removeFromCard} ></CartItems>
            })}
        </div>
    );
}

export default Product;