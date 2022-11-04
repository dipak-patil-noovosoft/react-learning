import {useEffect, useState} from "react";
import {ICardFetch, ICart, ICartProducts} from "../types";
import cartItems from "../Cart/CartItems";


const useCart = (id: number) =>{
    const [cart, setCart] = useState<ICartProducts[]>([]);
    const [cartID, setCartID] = useState(0);

    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data = await response.json();

            setCartID(data.carts[0]?.id)
            setCart(data.carts[0]?.products??[]);
            localStorage.setItem(id.toString(),JSON.stringify({cartId: data.carts[0]?.id??0,cartItems :data.carts[0]?.products ?? []}))
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


    const addToCart = async (productId:number) =>{

        // console.log(cart)

        if (cartID && cartID!==21){
            console.log({err : "inside",cartID});
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
        const data = await response.json();
        setCart(data.products);
        localStorage.setItem(JSON.stringify(id), JSON.stringify({cartId: cartID,cartItems :data.products}))

        }
        else{
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
            console.log(data)
            const ss = data.products;
            console.log(ss)
            localStorage.setItem(JSON.stringify(id), JSON.stringify({cartId: data.id,
                cartItems :[...cart, ...data.products]}))
            setCart([...cart,...data.products]);

        }

    }

    const removeFromCard = async (productId:number) =>{
        const cart = JSON.parse(localStorage.getItem(id.toString())??'[]');
        const cartFilterData = cart.cartItems.filter((e:any)=>(e.id)!== productId);
        setCart(cartFilterData);
        localStorage.setItem((id).toString(),JSON.stringify({cartId: cartID,cartItems:cartFilterData}))
        // // if (isExist.length !== 0){
        //     setCart(cartFilterData)
        //     console.log({productId,cartFilterData})
        //     // localStorage.setItem(JSON.stringify(id), JSON.stringify(cart));
        // // }
        //
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
