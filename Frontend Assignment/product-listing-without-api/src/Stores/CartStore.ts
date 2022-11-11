import {action, autorun, computed, makeAutoObservable, observable} from 'mobx'
import {ICartProduct} from "../types";
import {RootStore} from "./RootStore";
export class CartStore{
    rootStore:RootStore;
    @observable cartProducts:ICartProduct[] ;

    constructor(rootStore) {
        makeAutoObservable(this);
        this.cartProducts = [];
        this.rootStore = rootStore;
        autorun(()=>console.log("cart length : ",this.cartCount))
    }

    @computed get cartCount(){
        return this.cartProducts.length;
    }
    @action addToCart(cartProduct:ICartProduct){
        this.cartProducts.push(cartProduct);
    }


}