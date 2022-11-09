import React, {useContext, useState} from 'react';
import { IProduct} from "../types";
import userContext from "../../Context/UserContext";
import Item from "../Item/Item";
import {useOutletContext} from "react-router-dom";
import {IOutletContext} from "../ProductListingLayout/ProductListingLayout";
import {useFetch} from "../CustomHooks/useFetch";


const Cart:React.FC = () => {
        const {user} = useContext(userContext);
        const [paginateCount, setPaginateCount] = useState(0);
        const {state,cart} = useOutletContext<IOutletContext>();
        const {removeFromCard} = cart

    const fetchProducts = useFetch<IProduct>(`/products/search?q=${state.search}&limit=100`,[])
    const products = fetchProducts.products??[];
        let cartItem : any= [];
        const localStorageCart  = localStorage.getItem('cartDetails');
        if (localStorageCart){
            const cartData = JSON.parse(localStorageCart);
            cartItem = cartData[user.id]?.cartItems??[];
        }
        const cartItems = products.filter((ele:IProduct)=>cartItem.find(({id}:IProduct) =>ele.id ===id));

        return (
            <div>
                {cartItems.slice(paginateCount,paginateCount+5).map((e:IProduct)=>{
                    return <Item key={e["id"]}   product={e}  status={true} removeFromCard={removeFromCard} ></Item>
                })}
                <div className="productsPagination">

                    <button type="submit" id="btnPrevious" disabled={!(paginateCount>1)} onClick={()=>{
                        if (paginateCount > 0) setPaginateCount(paginateCount-5)
                    }}>Previous </button>
                    <button type="submit" disabled={!((paginateCount + 5) < cartItems.length)} onClick={()=>{
                        if ((paginateCount + 5) < cartItems.length)
                            setPaginateCount(paginateCount+5)
                    }} >Next</button>
                </div>
            </div>
        );
}

export default Cart;