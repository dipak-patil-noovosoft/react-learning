import {useEffect, useState} from "react";
import {ICartProducts, IProduct} from "../types";

const useCart = (userID: number) =>{ //userID
    const [cartItems, setCartItems] = useState<ICartProducts[]>([]);
    const [cartID, setCartID] = useState(0);
    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${userID}`);
            let data = await response.json();

            const cartData = {[userID]:{cartId:data.carts[0]?.id ?? 0,cartItems: data.carts[0]?.products ?? [] } }

            setCartID(data.carts[0]?.id ?? 0)
            setCartItems(data.carts[0]?.products ?? []);
            saveToLocalStorage(cartData)
        }
        const localStorageCartData = localStorage.getItem('cartDetails');
        if (localStorageCartData){
            const cartsInfo = JSON.parse(localStorageCartData)
            if(cartsInfo[userID]){
                setCartID(cartsInfo[userID].cartId);
                setCartItems(cartsInfo[userID].cartItems);
                return;
            }
        }
        getUserCart()
    }, [userID])

    const createUserCart = async (productId:number) =>{
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userID,
                products: [{id:productId}]
            })
        })
            const data = await response.json();
            if (response.ok){
                console.log(data)
                setCartItems([...cartItems,...data.products])
                const cartData  = {[userID]:{cartId:cartID,cartItems: [...cartItems,...data.products] } }
                saveToLocalStorage(cartData)
            }
    }
    const addToCart = async (productId:number) =>{
        if (cartID){
            const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: [
                        {
                            id : productId,
                        },
                        ...cartItems
                    ]
                })
            })
            if (response.ok){
                const data = await response.json();
                const cartFilterData = data.products.filter((e:IProduct)=>(e.id) === productId);
                setCartItems([...cartItems,...cartFilterData]);
                setCartID(data.id)
                const cartData  = {[userID]:{cartId:cartID,cartItems: [...cartItems,...cartFilterData] } }
                saveToLocalStorage(cartData);
            }
        }
        else{
            createUserCart(productId);
        }
    }

    const removeFromCard = async (productId:number) =>{

        const cartData  = JSON.parse(localStorage.getItem("cartDetails")??'')
        const cartFilterData = cartData?.[userID].cartItems.filter((e:IProduct)=>(e.id)!== productId);

        const response = await fetch(`https://dummyjson.com/carts/${cartID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                products: cartFilterData ,
            })
        })
        const data = await response.json();
        console.log(data)
        setCartItems(cartFilterData);
        cartData[userID].cartItems = cartFilterData;
        localStorage.setItem("cartDetails",JSON.stringify(cartData));
    }


    const saveToLocalStorage = (data :any) =>{
        const cartDetails = localStorage.getItem("cartDetails");
        let prevData = {};
        if (cartDetails){
            prevData = JSON.parse(cartDetails);
            console.log(data)
        }
        localStorage.setItem('cartDetails',JSON.stringify({

            ...prevData,
            ...data
            }
        ))
    }
    return {cartItems,addToCart,removeFromCard}
}
export  default useCart;
