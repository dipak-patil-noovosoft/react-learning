import React, { useContext, useState} from 'react';
import { ICartProducts, IProduct} from "../types";
import userContext from "../../Context/UserContext";
import Item from "../Item/Item";
import {useOutletContext} from "react-router-dom";
import {useFetch} from "../CustomHooks/useFetch";
import {IOutletContext} from "../Main/main";

interface IProductProps {
    addToCart: (id: number) => void;
    removeFromCard: (id: number) => void
}

function compare(cart: ICartProducts[], product: IProduct) {
    return cart.some((ct) => (ct['id'] === product['id']))
}

const Product: React.FC<IProductProps> = (props) => {
    const [paginateCount, setPaginateCount] = useState(0);
    const {addToCart, removeFromCard} = props
    const {state} = useOutletContext<IOutletContext>();
    const {user} = useContext(userContext) //refactor naming

    const fetchProduct = useFetch<any>(`/products/search?q=${state.search}&limit=100`,[])
    const products = fetchProduct.products??[];

    const filterProducts = products.filter((e : IProduct)=>{
        if (state.category === 'All')return true
        return e.category === state.category
    });

    let cart : any= [];
    const localStorageCart  = localStorage.getItem('cartDetails');
    if (localStorageCart){
        const cartData = JSON.parse(localStorageCart);
        cart = cartData[user.id]?.cartItems??[];
    }
    return (
        <div>
            {filterProducts.slice(paginateCount, paginateCount + 5).map((e:IProduct) => {
                return <Item key={e["id"]}
                             product={e} addToCart={addToCart}
                             removeFromCard={removeFromCard}
                             status={compare(cart, e)}
                ></Item>
            })}
            <div className="productsPagination">

                <button type="submit" onClick={() => {
                    if (paginateCount > 1) setPaginateCount(paginateCount - 5)
                }}>Previous
                </button>
                <button type="submit" onClick={() => {
                    if ((paginateCount + 5) < products.length)
                        setPaginateCount(paginateCount + 5)
                }}>Next
                </button>
            </div>
        </div>
    );
}

export default Product;