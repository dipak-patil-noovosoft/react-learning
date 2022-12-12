import { makeObservable, observable} from "mobx";
import Networking from "../Networking/Networking";
import {IProduct} from "../Types";
import RootStore from "./rootStore";
import ListTableStore from "./ListTableStore";

export default class ProductStore {
    @observable productList: IProduct[] | null = null;
    rootStore;
    public listTableStore: ListTableStore<IProduct[]>;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchProduct);
    }
    fetchProduct = async (page: number) => {
        // https://dummyjson.com/products?limit=10&skip=32
        return await Networking.getData<IProduct[]>(
            `products?limit=${page}&skip=32`
        );
    };
}