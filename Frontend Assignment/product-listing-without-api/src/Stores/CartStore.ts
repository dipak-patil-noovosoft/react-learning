import {action , makeAutoObservable, observable} from 'mobx'
import {ICartProduct} from "../types";
import RootStore from "./RootStore";
export class CartStore{
    rootStore:RootStore;
    @observable cartProducts:ICartProduct[] ;

    constructor(rootStore) {
        makeAutoObservable(this);
        this.cartProducts = [];
        this.rootStore = rootStore;
    }

    getCartQuantity(CartItemID){
        const data = this.cartProducts.find((e)=>e.id===CartItemID);
        if (data) return  data.quantity;
        return  0;
    }

    @action addToCart(ID:Number){
        const check = this.cartProducts.find((e)=>e.id===ID);
        if (!check){
            const product = this.rootStore.productStore.products.find((e)=>e.id===ID);
            const {description,...rest} = product;
            rest['quantity'] = 1;
            this.cartProducts.push(<ICartProduct>rest)
        }
        else{
            this.cartProducts.find((e)=>e.id===ID).quantity++;
        }
    }
    @action removeFromCart(ID:Number){
        const data = this.cartProducts.find((e)=>e.id===ID);
        if (data.quantity>1) {
            this.cartProducts.find((e) => e.id === ID).quantity--;
            return;
        }
        this.cartProducts.splice(this.cartProducts.findIndex(e => e.id === ID) , 1)
    }
}