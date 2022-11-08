import {useEffect, useState} from "react";
import {ICartProducts, IProduct} from "../types";

const useCart = (id: number) =>{ //userID
    const [cart, setCart] = useState<ICartProducts[]>([]);
    const [cartID, setCartID] = useState(0);

    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data = await response.json();

            const cartDetails = localStorage.getItem("cartDetails");

            if(cartDetails){
                const cartData = JSON.parse(cartDetails);
                let obj :any = {};
                setCartID(data.carts[0]?.id)
                setCart(data.carts[0]?.products??[]);// refactor setCartItems
                obj[id] = {cartId: data.carts[0]?.id ?? 0, cartItems: data.carts[0]?.products ?? []}
                localStorage.setItem("cartDetails",JSON.stringify({...cartData, ...obj}))
                return;
            }
            let obj :any = {};
            obj[id] = {cartId: data.carts[0]?.id ?? 0, cartItems: data.carts[0]?.products ?? []}
            localStorage.setItem("cartDetails",JSON.stringify(obj))

        }
            const localStorageCartData = localStorage.getItem('cartDetails');
            if (localStorageCartData){
                const isExist = JSON.parse(localStorageCartData)
                if(isExist[id]){
                    setCartID(isExist.cartId);
                    setCart(isExist.cartItems);
                    return;
                }
            }
            getUserCart()
    }, [id])

    const createUserCart = async (productId:number) =>{
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: id,
                products: [{id:productId}]
            })
        })
            const data = await response.json();
            setCartID(data.id);
            setCart([data.products]);
            if (response.ok){
                const cartFilterData = data.products.filter((e:IProduct)=>(e.id) === productId);
                const cartData  = JSON.parse(localStorage.getItem("cartDetails")??'')
                cartData[id].cartItems.push( ...cartFilterData)
                localStorage.setItem("cartDetails",JSON.stringify(cartData));
            }
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
                const cartFilterData = data.products.filter((e:IProduct)=>(e.id) === productId);
                setCart([...cart,...cartFilterData]);
                const cartData  = JSON.parse(localStorage.getItem("cartDetails")??'')
                cartData[id].cartItems = [...cart,...cartFilterData]
                localStorage.setItem("cartDetails",JSON.stringify(cartData));
                // localStorage.setItem(JSON.stringify(id), JSON.stringify({cartId: cartID,cartItems :[...cart,...cartFilterData]}))
            }
        }
        else{
            createUserCart(productId);
        }
    }

    const removeFromCard = async (productId:number) =>{
        const cartData  = JSON.parse(localStorage.getItem("cartDetails")??'')
        console.log("here")
        const cartFilterData = cartData?.[id].cartItems.filter((e:IProduct)=>(e.id)!== productId);
        setCart(cartFilterData);
        console.log(cartFilterData);
        cartData[id].cartItems = cartFilterData;
        localStorage.setItem("cartDetails",JSON.stringify(cartData));


        // localStorage.setItem((id).toString(),JSON.stringify({cartId: cartID,cartItems:cartFilterData}))


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



// [count,setCount] = useState("");
//
// <Custom tile ="dad" handle={increment}>
//
// </Custom>
// <Custom tile ="dad" >
//
// </Custom>
