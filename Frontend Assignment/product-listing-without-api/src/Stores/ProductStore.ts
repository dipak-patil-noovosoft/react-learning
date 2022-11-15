import {makeAutoObservable, observable, computed, action, autorun, toJS} from 'mobx'
import {} from 'mobx-react'
import {IProduct} from "../types";
export class ProductStore {

    @observable products:IProduct[] = [];
    @observable id: number = 0;
    rootStore
    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore;
    }

    getProductQuantity(productID){
        const data = this.products.find((e)=>e.id===productID);
        if (data) return  data.quantity;
        return  0;
    }

    @action addProduct(product:Omit<IProduct,'id'>){
        console.log(toJS(product))
        this.products.push(<IProduct>{
            id: this.id++,
            ...product
        })
    }

    @action  addToCart(id:number){
        this.rootStore.cartStore.addToCart(
            this.products.find((e)=>e.id===id)
        )
    }

    @action removeFromCart(id:number){
        console.log('remove')
        this.rootStore.cartStore.removeFromCart(id);
        this.products.map((e)=>e);
    }
}