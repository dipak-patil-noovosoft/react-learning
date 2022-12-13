import ProductStore from "./ProductStore";

export default class RootStore {
    public productStore;

    constructor() {
        this.productStore = new ProductStore(this);
    }
}