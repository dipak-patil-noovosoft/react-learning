export interface ICartProduct{
    id:number,
    productName:string,
    price: number,
    discountedPrice:number,
    quantity:number,
}

export interface IProduct extends ICartProduct{
    category: string,
    description: string
}
