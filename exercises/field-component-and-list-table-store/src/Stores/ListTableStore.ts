import {action, makeObservable, observable, reaction} from "mobx";
import type {IFetcherResponse} from "../Types";

export default class ListTableStore<T extends unknown> {
    @observable list: T[] | null = null;
    @observable page: number = 0;
    @observable totalPages: number = 0;
    @observable searchQuery: string = ''
    @observable filter: string = ''
    @observable limit: number = 10;

    constructor(public fetcher: (page: number, limit: number, searchQuery: string, filter: string) => Promise<IFetcherResponse<T>>) {
        makeObservable(this);
        //Testing purpose

        // autorun(() => {
        //     fetcher(this.page, this.limit, this.searchQuery, this.filter)
        //         .then((data: IFetcherResponse<T>) => this.setList(data))
        //         .catch(e => console.log(e))
        // })
        reaction(
            () => [this.page, this.filter, this.searchQuery],
            () => {
                fetcher(this.page, this.limit, this.searchQuery, this.filter)
                    .then((data: IFetcherResponse<T>) => this.setList(data))
                    .catch(e => console.log(e))
            }, {
                fireImmediately: true
            }
        )
    }

    @action setList(data: IFetcherResponse<T>) {
        this.list = data.list;
        this.totalPages = Math.ceil(data.total / this.limit);
    }

    @action setSearchQuery = (value: string) => this.searchQuery = value;
    @action setPage = (value: number) => this.page = value;
    @action setFilter = (value: string) => this.filter = value;
}