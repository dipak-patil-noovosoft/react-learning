import {useEffect, useState} from "react";
import { ICartProducts} from "../types";

const useCart = (id: number) =>{
    const [cart, setCart] = useState<ICartProducts[]>([]);
    const [cartID, setCartID] = useState(0);

    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data = await response.json();
            setCartID(data.carts[0]?.id)
            setCart(data.carts[0]?.products??[]);
            localStorage.setItem(id.toString(),JSON.stringify({cartId: data.carts[0]?.id ?? 0, cartItems :data.carts[0]?.products ?? []}))
        }
            const localStorageCartData = localStorage.getItem(id.toString());
            if (localStorageCartData){
                const isExist = JSON.parse(localStorageCartData)
                setCartID(isExist.cartId);
                setCart(isExist.cartItems);
                return;
            }
            getUserCart()
    }, [id])

    const createUserCart = async (productId:number) =>{
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: [{id:productId}]

            })
        })
        const data = await response.json();
        setCartID(data.id);
        setCart([...cart,...data.products]);
        localStorage.setItem(JSON.stringify(id), JSON.stringify({cartId: data.id,
            cartItems :[...cart, ...data.products]}))
    }

    const addToCart = async (productId:number) =>{
        if (cartID && cartID!==21){
            const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: [
                        {
                            id : productId,
                        },
                        ...cart
                    ]
                })
            })
            if (response.ok){
                const data = await response.json();
                const cartFilterData = data.products.filter((e:any)=>(e.id) === productId);
                setCart([...cart,...cartFilterData]);
                localStorage.setItem(JSON.stringify(id), JSON.stringify({cartId: cartID,cartItems :[...cart,...cartFilterData]}))
            }
        }
        else{
            createUserCart(productId);
        }

    }

    const removeFromCard = async (productId:number) =>{
        const cart = JSON.parse(localStorage.getItem(id.toString())??'[]');
        const cartFilterData = cart.cartItems.filter((e:any)=>(e.id)!== productId);
        setCart(cartFilterData);
        localStorage.setItem((id).toString(),JSON.stringify({cartId: cartID,cartItems:cartFilterData}))


        // // const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
        // //     method: 'PUT',
        // //     headers: { 'Content-Type': 'application/json' },
        // //     body: JSON.stringify({
        // //         products: cartFilterData,
        // //     })
        // // })
        // // const delData = await response.json();
    }
    return {cart,addToCart,removeFromCard}
}
export  default useCart;
