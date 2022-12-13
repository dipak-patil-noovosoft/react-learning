import {action, autorun, makeObservable, observable} from "mobx";
import type {IListStore} from "../Types";

export default class ListTableStore<T extends unknown> {
    @observable list: T[] | null = null;
    @observable page: number = 0;
    @observable total: number = 0;
    @observable searchQuery: string = ''
    @observable filter: string = ''

    constructor(public fetch: (page: number, searchQuery: string, filter: string) => Promise<IListStore<T>>) {
        makeObservable(this);
        autorun(() => {
            fetch(this.page, this.searchQuery, this.filter)
                .then((data) => this.setList(data))
                .catch(e => console.log(e))
        })
    }

    @action setList(data: IListStore<T>) {
        this.list = data.list;
        this.total = data.total;
    }

    @action setSearchQuery = (value: string) => this.searchQuery = value;
    @action setPage = (value: number) => this.page = value;
    @action setFilter = (value: string) => this.filter = value;
}