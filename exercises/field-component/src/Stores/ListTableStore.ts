import {action, autorun, makeObservable, observable} from "mobx";

export default class ListTableStore<T extends unknown> {
    @observable list: T | null = null;
    @observable page: number = 0;
    @observable searchQuery: string = ''

    constructor(getData: (page: number, searchQuery: string) => Promise<T>) {
        makeObservable(this);
        autorun(() => {
            getData(this.page, this.searchQuery)
                .then((data) => this.setList(data))
                .catch(e => console.log(e))
        })
    }

    @action setList(data: any) {
        this.list = data;
    }

    @action setSearchQuery = (value: string) => this.searchQuery = value;

    @action
    setPage = (p: number) => {
        this.page = p;
    }
}