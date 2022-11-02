import {useEffect, useState} from "react";
import {ICardFetch, ICart, ICartProducts} from "../types";


const useCart = (id: number) =>{
    const [cart, setCart] = useState<ICartProducts[]>([]);

    const addToCart = async (id:number) =>{
        console.log(id)
       const response = (await fetch('https://dummyjson.com/carts/add', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               userId: 5,
               products: [
                   {
                       id: id,
                       quantity: 1,
                   },
               ]
           })
       }))
       const data = await response.json();
        setCart([...cart,data.products[0]])
    }

    const removeFromCard = async () =>{
        console.log("remove")
    }
    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data = await response.json();
            console.log(data.carts[0])
            setCart(data.carts?.[0].products??[])
        }
        getUserCart()
    }, [id]);
    return {cart,addToCart,removeFromCard}
}
export  default useCart;
