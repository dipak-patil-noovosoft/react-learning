import {action, makeObservable, observable} from "mobx";
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
    @observable categories: string[] | null = null;
    rootStore;
    public listTableStore: ListTableStore<IProduct>;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchProduct);
    }

    @action setCategories = (data: string[]) => this.categories = data;

    fetchProduct = async (page: number, searchQuery: string, filter: string) => {
        let url = `products/search?q=${searchQuery}&limit=${10}&skip=${page * 10}`
        if (filter.length && filter !== 'All' && searchQuery === '') {
            url = `products/category/${filter}`;
        }
        const data = await Networking.getData<IFetchResponse>(url);
        return {
            list: data.products,
            total: data.total / 10,
        };
    };

    fetchAllCategories = async () => {
        const data = await Networking.getData<string[]>('products/categories');
        this.setCategories(data)
    }
}