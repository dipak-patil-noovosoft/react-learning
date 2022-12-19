import {action, makeObservable, observable} from "mobx";

interface IFilter {
    name: string,
    isSelected: boolean,
    type: string,
    options?: any[]
}

export default class FilterPickerStore {
    @observable filter: IFilter[] = [];
    @observable currentSelected: IFilter | null = null;
    @observable selectedFilter: IFilter[] = []
    @observable currentSelectedOption = '';

    constructor() {
        makeObservable(this)
    }

    @action setFilterList(data: IFilter[]) {
        this.filter = data;
    }

    @action setCurrentFilter = (key: string) => {
        this.currentSelected = this.filter.find((e) => e.name === key)!;
    }
    @action setCurrentSelectedOption = (key: string) => {
        this.currentSelectedOption = key;
    }

    @action addFilter = (key: string | undefined) => {
        if (key === undefined) return null;
        this.selectedFilter.push(this.filter.find((e) => e.name === key)!);
        this.filter.find((e) => e.name === key)!.isSelected = true
    }
}