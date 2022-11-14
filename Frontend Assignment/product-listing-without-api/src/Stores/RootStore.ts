import {ProductStore} from "./ProductStore";
import {CartStore} from "./CartStore";

export class RootStore{
    cartStore;
    productStore;
    routerStore;
    constructor(routerStore) {
        this.cartStore = new CartStore(this);
        this.productStore = new ProductStore(this);
        this.routerStore = routerStore;
    }
}
