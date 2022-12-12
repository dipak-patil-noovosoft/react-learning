import {action, autorun, makeObservable, observable} from "mobx";

export default class ListTableStore<T> {
    @observable list: T | null = null;
    @observable page: number = 0;

    constructor(getData: (page: number) => Promise<T>) {
        makeObservable(this);
        autorun(() => {
            getData(this.page)
                .then((data) => this.setList(data))
                .catch(e => console.log(e))
        })
    }

    @action setList(data: any) {
        this.list = data;
    }

    @action
    setPage = (p: number) => {
        this.page = p;
    }
}