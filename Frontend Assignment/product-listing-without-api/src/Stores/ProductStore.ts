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
        autorun(()=>console.log("Length : ",this.productCount))
    }

    @computed get productCount(){
        return this.products.length;
    }

    @action addProduct(product:Omit<IProduct,'id'>){
        this.products.push({
            id:this.id++,
            ...product
        })
    }

    @action  addToCart(id:number){
        this.rootStore.cartStore.addToCart(
        this.products.find((e)=>e.id===id)
        )
    }
}