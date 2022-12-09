import {action, makeObservable, observable} from "mobx"

export default class FormStore<T extends object> {

    @observable data: T;
    @observable errorFields: Partial<Record<keyof T | string, string>> = {};
    @observable isDisabled: boolean = false;
    @observable requiredFields: Partial<Record<keyof T, boolean>> = {};

    constructor(data: T) {
        makeObservable(this)
        this.data = data;
    }

    @action setValue<K extends keyof T>(key: K, value: T[K], index?: number) {
        if (index !== undefined) {
            console.log(key, index, value);
            (this.data[key] as T[K][]) [index] = value as T[K];
        } else {
            this.data[key] = value as T[K];
        }
    }

    getValue = <K extends keyof T>(key: K, index?: number) => {
        if (index !== undefined) {
            return (this.data[key] as T[K][])[index]
        } else {
            return this.data[key];
        }
    }

    isChecked = <K extends keyof T>(key: K, val: T[K]) => this.getValue(key) === val;
    getRequiredFields = <K extends keyof T>(key: K) => this.requiredFields[key]
    getErrorMessage = <k extends keyof T>(key: k, index?: number) => {
        if (index !== undefined) {
            const newkey = (String(key) + index) as string;
            return this.errorFields[newkey];
        }
        return this.errorFields[key];
    }
    @action setRequiredFields = <K extends keyof T>(key: K) => this.requiredFields[key] = true;
    @action clearErrorField = () => this.errorFields = {};
    @action setIsDisabled = (flag: boolean) => this.isDisabled = flag;

    @action setErrorField = <K extends keyof T>(key: K, error: string, index?: number) => {
        if (index !== undefined) {
            const newkey = (String(key) + index) as string | keyof T;
            return this.errorFields[newkey] = error;
        }
        return this.errorFields[key] = error;
    }

    isValidate = () => {
        let flag = true;
        for (let key in this.requiredFields) {
            let currentKey = key as keyof T;
            const getCurrent = this.data[currentKey];
            if (Array.isArray(getCurrent)) {
                for (let i = 0; i < getCurrent.length; i++) {
                    if (getCurrent[i] === '') {
                        this.setErrorField(currentKey, "Field Required", i)
                        flag = false;
                    }
                }
            }
            if (this.requiredFields[key] && (this.getValue(currentKey) === '')) {
                this.setErrorField(currentKey, "Field Required")
                 flag = false;

            }
        }
        return flag;
    }

    onSubmit() {
        this.clearErrorField();
        return this.isValidate()
    }
}