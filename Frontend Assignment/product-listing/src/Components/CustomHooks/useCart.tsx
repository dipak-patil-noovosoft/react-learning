import {useEffect, useState} from "react";
import {ICardFetch, ICart, ICartProducts} from "../types";


const useCart = (id: number) =>{
    const [cart, setCart] = useState<ICartProducts[]>([]);
    const [cartID, setCartID] = useState(0);

    const addToCart = async (id:number) =>{
       const response = await fetch(`https://dummyjson.com/carts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: [
                    {
                        id : id,
                    },
                    cart
                ]

            })
        })
        const data = await response.json();

       setCart([...cart,data.products[0]]);
    }

    const removeFromCard = async (productId:number) =>{
        const cartFilterData = cart.filter((e)=>(e.id)!== productId);
        const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: cartFilterData,
            })
        })
        const delData = await response.json();
        setCart(delData.products)
    }
    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data = await response.json();
            // console.log(data.carts[0].id)
            setCartID(data.carts[0].id)
            setCart(data.carts?.[0]?.products??[])
        }
        getUserCart()
    }, [id]);
    return {cart,addToCart,removeFromCard}
}
export  default useCart;
