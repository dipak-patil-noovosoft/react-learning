import {ProductStore} from "./ProductStore";
import {CartStore} from "./CartStore";

export class RootStore{
    cartStore;
    productStore;
    rootStore;
    constructor(rootSore) {
        this.cartStore = new CartStore(this);
        this.productStore = new ProductStore(this);
        this.rootStore = rootSore;
    }
}