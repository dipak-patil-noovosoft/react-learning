import {useEffect, useState} from "react";

export interface ICartProduct{
    id:number,
    products : [],
    total:number,
    totalProducts :number,
    totalQuantity:number,
    userId :number
}
export  interface ICart{
    carts :ICartProduct[],
    total :number,
    skip : number,
    limit: number
}
const useCart = (id: number) =>{
    const [cart, setCart] = useState<ICart['carts']>([]);

    useEffect(() => {
        const getUserCart = async ()=>{
            const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
            let data:ICart = await response.json();
            setCart(data.carts?.[0].products??[])
        }
        getUserCart()
    }, [id]);
    return cart
}
export  default useCart;