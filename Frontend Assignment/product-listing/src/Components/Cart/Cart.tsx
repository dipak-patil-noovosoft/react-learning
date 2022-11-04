import React, {useContext, useEffect} from 'react';
import useProduct from "../CustomHooks/useProducts";
import {ICartProducts, IProduct} from "../types";
import CartItems from "./CartItems";
import useUser from "../CustomHooks/useUser";
import useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";
import cartItems from "./CartItems";
import './cartItems.css'

interface ICartProps{
    cart?: ICartProducts[]
    user? : {id:number, firstName :string}
    removeFromCard?: (id:number) => void
}
const Cart:React.FC<ICartProps> = (props) => {
        const currentUser = useContext(userContext);
        const {removeFromCard} = useCart(currentUser.user.id)

        const products = useProduct();

        const test  = (localStorage.getItem(JSON.stringify(currentUser.user.id)))
        const carts = test?JSON.parse(test):[];
        const cartItems = products.filter((ele:IProduct)=>carts.cartItems.find(({id}:any) =>ele.id ===id));

        return (
            <div>
                <div className="cartNav">
\                    <div className="cartUser">
                        <h1>{currentUser.user.firstName}'s Cart</h1>
                    </div>
                    <div className="cartCount">
                       <h2>{carts.length} Items</h2>
                    </div>
                </div>


                {cartItems.map((e:any)=>{
                    return <CartItems key={e["id"]} user={currentUser.user}  product={e} removeFromCard={removeFromCard} ></CartItems>
                })}
            </div>
        );
}

export default Cart;