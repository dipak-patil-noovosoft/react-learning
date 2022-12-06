import {action, makeObservable, observable} from "mobx"

export default class FormStore<T extends object> {

    @observable data: T;

    constructor(data: T) {
        makeObservable(this)
        this.data = data;
    }

    @action setValue<K extends keyof T>(key: K, value: T[K]) {
        this.data[key] = value as T[K];
    }

    getValue<K extends keyof T>(key: K) {
        return this.data[key];
    }
}