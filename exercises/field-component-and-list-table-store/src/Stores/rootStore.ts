import ProductStore from "./ProductStore";
import PostStore from "./PostStore";
import {RouterStore} from "mobx-state-router";

export default class RootStore {
    public productStore;
    public postStore
    routerStore;

    constructor(routerStore: RouterStore) {
        this.productStore = new ProductStore(this);
        this.postStore = new PostStore(this);
        this.routerStore = routerStore;
    }
}