import {action, makeObservable, observable} from "mobx";

export interface IFilter {
    name: string,
    isSelected: boolean,
    type: string,
    options?: any[]
    value: string | number | boolean
}

export default class FilterPickerStore {
    @observable filter: IFilter[] = [];
    @observable currentSelected: string | null = null;
    @observable selectedFilter: IFilter[] = []

    constructor() {
        makeObservable(this)
    }

    getCurrentValue = (type: string) => this.filter.find(filter => filter.type === type)!.value
    @action setFilterList = (data: IFilter[]) => this.filter = data;
    @action setCurrentFilter = (key: string) => this.currentSelected = key!;
    @action setCurrentSelectedOption = (key: string, value: string | number | boolean) => this.filter.find(filter => filter.type === key)!.value = value;

    @action addFilter = (key: string) => {
        this.selectedFilter.push(this.filter.find((e) => e.name === key)!);
        this.filter.find((e) => e.name === key)!.isSelected = true
        this.currentSelected = null;
    }
}