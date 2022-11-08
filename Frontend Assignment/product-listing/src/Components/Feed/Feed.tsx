import React, {useContext, useEffect, useState} from 'react';
import Product from "./Product";
import  useCart from "../CustomHooks/useCart";
import userContext from "../../Context/UserContext";


function Feed() {
    const {user} = useContext(userContext);
    const {addToCart,removeFromCard} = useCart(user.id);

    return (
        <div>
            <Product
                addToCart = {addToCart}
                removeFromCard={removeFromCard}
            ></Product>
        </div>
    );
}

export default Feed;