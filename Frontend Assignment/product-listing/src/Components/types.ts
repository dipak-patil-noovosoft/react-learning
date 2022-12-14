// product
export interface IProduct{
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}
// cart
export interface ICartProducts{
    "id": number,
    "title": string,
    "price": number,
    "quantity": number,
    "total": number,
    "discountPercentage": number,
    "discountedPrice": number
}
// export interface ICart{
//     id:number,
//     // array of products
//     products : ICartProducts[],
//     total:number,
//     totalProducts :number,
//     totalQuantity:number,
//     userId :number
// }
// response
export  interface IProduct{ //
    // array of carts
    products :IProduct[],
    total :number,
    skip : number,
    limit: number
}
//
export interface IReducerState{
    search:string,category:string
}
export interface IUser{
 id:number,firstName:string
}
export interface IUsers{
    users:[],
    "total": number,
    "skip": number,
    "limit": number
}

export interface ILocalStorageCart{
    cartId : number,
    cartItems : ICartProducts[]
}