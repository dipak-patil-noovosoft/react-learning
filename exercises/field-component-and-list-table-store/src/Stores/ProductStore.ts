import {makeObservable, observable} from "mobx";
import Networking from "../Networking/Networking";
import {IFetcherResponse, IProduct} from "../Types";
import RootStore from "./rootStore";
import ListTableStore from "./ListTableStore";

interface IProductResponse {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

export default class ProductStore {
    @observable productList: IProduct[] | null = null;
    public categories: ListTableStore<string>;
    rootStore;
    public listTableStore: ListTableStore<IProduct>;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchProduct);
        this.categories = new ListTableStore(this.fetchAllCategories);
    }


    fetchProduct = async (page: number, limit: number, searchQuery: string, filter: string) => {
        let url = `products/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`
        if (searchQuery.length) {
            url = `products/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`
        }
        if (filter.length && filter !== 'All') {
            url = `products/category/${filter}`;
        }
        const data = await Networking.getData<IProductResponse>(url);

        return {
            list: data.products,
            limit: data.limit,
            skip: data.skip,
            total: data.total
        } as IFetcherResponse<IProduct>
    };

    fetchAllCategories = async () => {
        const data = await Networking.getData<string[]>('products/categories');
        return {
            list: data,
            total: data.length,
            skip: 0,
            limit: 0
        } as IFetcherResponse<string>
    }
}