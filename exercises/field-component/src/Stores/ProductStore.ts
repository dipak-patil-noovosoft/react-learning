import {makeObservable, observable} from "mobx";
import Networking from "../Networking/Networking";
import {IProduct} from "../Types";
import RootStore from "./rootStore";
import ListTableStore from "./ListTableStore";

interface IFetchResponse {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

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
        const data = await Networking.getData<IFetchResponse>(
            `products/search?q=&limit=${10}&skip=${page * 10}`
        );

        return data.products;
    };
}