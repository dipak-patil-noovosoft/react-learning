import React from 'react';
import useProduct from "../CustomHooks/useProducts";
import {ICartProducts, IProduct} from "../types";
import CartItems from "./CartItems";
interface ICartProps{
    cart: ICartProducts[]
    user : {id:number, firstName :string}
    removeFromCard: (id:number) => void


}
const Cart:React.FC<ICartProps> = (props) => {

    const products = useProduct();
    const {cart,user,removeFromCard} =  props;
    const cartItems = products.filter((ele:IProduct)=>cart.find(({id}) =>ele.id ===id));
    return (
        <div>
            <h1 style={{textAlign:"center"}}>Cart</h1>
            {cartItems.map((e)=>{
                return <CartItems key={e["id"]} user={user} product={e} removeFromCard={removeFromCard} ></CartItems>
            })}
        </div>
    );
}

export default Cart;