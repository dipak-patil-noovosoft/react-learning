import React, {useContext, useState} from 'react';
import useProduct from "../CustomHooks/useProducts";
import { IProduct} from "../types";

import useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";
import './cartItems.css'
import Item from "../Item/Item";


const Cart:React.FC = () => {
        const currentUser = useContext(userContext);
        const {removeFromCard} = useCart(currentUser.user.id)
        const [paginateCount, setPaginateCount] = useState(0);

        const products = useProduct();
        const userContx  = useContext(userContext);
        let cart : any= [];
        const localStorageCart  = localStorage.getItem('cartDetails');
        if (localStorageCart){
            const cartData = JSON.parse(localStorageCart);
            cart = cartData[userContx.user.id]?.cartItems??[];
        }
        const cartItems = products.filter((ele:IProduct)=>cart.find(({id}:IProduct) =>ele.id ===id));

        return (
            <div>
                {cartItems.slice(paginateCount,paginateCount+5).map((e:IProduct)=>{
                    return <Item key={e["id"]}   product={e}  status={true} removeFromCard={removeFromCard} ></Item>
                })}
                <div className="cartItemsPagination">

                    <button type="submit" id="btnPrevious" onClick={()=>{
                        if (paginateCount > 0) setPaginateCount(paginateCount-5)
                    }}>Previous </button>
                    <button type="submit" onClick={()=>{
                        if ((paginateCount + 5) < cartItems.length)
                            setPaginateCount(paginateCount+5)
                    }} >Next</button>
                </div>
            </div>
        );
}

export default Cart;