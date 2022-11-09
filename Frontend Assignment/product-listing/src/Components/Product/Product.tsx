import React, { useContext, useState} from 'react';
import { ICartProducts, IProduct} from "../types";
import userContext from "../../Context/UserContext";
import Item from "../Item/Item";
import {useOutletContext} from "react-router-dom";
import {useFetch} from "../CustomHooks/useFetch";
import {IOutletContext} from "../ProductListingLayout/ProductListingLayout";

function compare(cart: ICartProducts[], product: IProduct) {
    return cart.some((ct) => (ct['id'] === product['id']))
}

const Product: React.FC = () => {
    const [paginateCount, setPaginateCount] = useState(0);
    const {state,cart} = useOutletContext<IOutletContext>();
    const {user} = useContext(userContext)

    const fetchProducts = useFetch<IProduct>(`/products/search?q=${state.search}&limit=100`,[])
    const products = fetchProducts.products??[];
    const {addToCart,removeFromCard} = cart;

    const filterProducts = products.filter((e : IProduct)=>{
        if (state.category === 'All')return true
        return e.category === state.category
    });

    let userCart : any= [];
    const localStorageCart  = localStorage.getItem('cartDetails');
    if (localStorageCart){
        const cartData = JSON.parse(localStorageCart);
        userCart = cartData[user.id]?.cartItems??[];
    }
    return (
        <div>
            {filterProducts.slice(paginateCount, paginateCount + 5).map((e:IProduct) => {
                return <Item key={e["id"]}
                             product={e} addToCart={addToCart}
                             removeFromCard={removeFromCard}
                             status={compare(userCart, e)}
                ></Item>
            })}
            <div className="productsPagination">
                <button type="submit" disabled={!(paginateCount>1)} onClick={() => {
                    if (paginateCount > 1) setPaginateCount(paginateCount - 5)
                }}>Previous
                </button>
                <button type="submit" disabled={!((paginateCount + 5) <products.length)} onClick={() => {
                    if ((paginateCount + 5) < products.length)
                        setPaginateCount(paginateCount + 5)
                }}>Next
                </button>
            </div>
        </div>
    );
}

export default Product;