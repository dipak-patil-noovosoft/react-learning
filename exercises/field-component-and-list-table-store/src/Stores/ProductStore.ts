import {makeAutoObservable} from "mobx";
import Networking from "../Networking/Networking";
import {IProduct} from "../Types";
import RootStore from "./rootStore";
import ListTableStore from "./ListTableStore";

export interface IProductResponse {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

export default class ProductStore {
    public categories: ListTableStore<string[]>;
    rootStore;
    public listTableStore: ListTableStore<IProductResponse>;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchProduct);
        this.categories = new ListTableStore(this.fetchAllCategories);
    }

    fetchProduct = (page: number, limit: number, searchQuery: string, filter: string) => {
        let url = `products/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`
        if (searchQuery.length) {
            url = `products/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`
        }
        if (filter.length && filter !== 'All') {
            url = `products/category/${filter}`;
        }
        return Networking.getData<IProductResponse>(url);
    };

    fetchAllCategories = () => {
        return Networking.getData<string[]>('products/categories');
    }
}