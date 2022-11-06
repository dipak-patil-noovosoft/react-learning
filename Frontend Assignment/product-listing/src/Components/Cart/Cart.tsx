import React, {useContext, useState} from 'react';
import useProduct from "../CustomHooks/useProducts";
import {ICartProducts, IProduct} from "../types";
import CartItems from "./CartItems";
import useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";
import './cartItems.css'
import {Link} from "react-router-dom";

interface ICartProps{
    cart?: ICartProducts[]
    user? : {id:number, firstName :string}
    removeFromCard?: (id:number) => void
}
const Cart:React.FC<ICartProps> = (props) => {
        const currentUser = useContext(userContext);
        const {removeFromCard} = useCart(currentUser.user.id)
        const [paginateCount, setPaginateCount] = useState(0);

        const products = useProduct();
        const test  = (localStorage.getItem(JSON.stringify(currentUser.user.id)))
        const carts = test?JSON.parse(test):[];
        const cartItems = products.filter((ele:IProduct)=>carts.cartItems.find(({id}:any) =>ele.id ===id));

        return (
            <div>
                <div className="cartNav">
                    <h2>
                        <Link className="homeLink" to='/'>
                            Home
                        </Link>
                    </h2>
                    <div className="cartUser">
                        <h1>{currentUser.user.firstName}'s Cart</h1>
                    </div>
                    <div className="cartCount">
                       <h2>{carts.cartItems.length} Items </h2>
                    </div>
                </div>


                {cartItems.slice(paginateCount,paginateCount+5).map((e:any)=>{
                    return <CartItems key={e["id"]} user={currentUser.user}  product={e} removeFromCard={removeFromCard} ></CartItems>
                })}
                <div className="cartItemsPagination">

                    <button type="submit" onClick={()=>{
                        if (paginateCount > 1) setPaginateCount(paginateCount-5)
                    }}>Preveus </button>
                    <button type="submit" onClick={()=>{
                        if ((paginateCount + 5) < cartItems.length)
                            setPaginateCount(paginateCount+5)
                    }} >Next</button>
                </div>
            </div>
        );
}

export default Cart;