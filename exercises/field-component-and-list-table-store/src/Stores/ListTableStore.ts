import {action, makeObservable, observable} from "mobx";

type TFetcher<T> = (page: number, limit: number, searchQuery: string, filter: string) => Promise<T>;

export default class ListTableStore<T extends { total: number, skip: number, limit: number } | unknown> {
    @observable list: T | null = null;
    @observable page: number = 0;
    @observable totalPages: number = 0;
    @observable searchQuery: string = ''
    @observable filter: string = ''
    @observable limit: number = 10;
    fetcher

    constructor(fetcher: TFetcher<T>) {
        makeObservable(this);
        this.fetcher = fetcher;
    }

    @action setList(data: T) {
        this.list = data;
        if ((data as { total: number }).total) this.totalPages = Math.ceil((data as { total: number }).total / this.limit);
    }

    @action fetchData = () => {
        this.fetcher(this.page, this.limit, this.searchQuery, this.filter)
            .then((data: T) => this.setList(data))
            .catch(e => console.log(e))
    }

    @action setSearchQuery = (value: string) => {
        this.searchQuery = value;
        this.fetchData();
    }
    @action setPage = (value: number) => {
        this.page = value;
        this.fetchData();
    }
    @action setFilter = (value: string) => {
        this.filter = value;
        this.fetchData();
    }
}