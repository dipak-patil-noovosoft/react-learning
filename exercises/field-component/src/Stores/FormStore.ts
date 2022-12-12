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

    @action setValue = <K extends keyof T>(key: K, value: T[K]) => this.data[key] = value as T[K];
    @action setRequiredFields = <K extends keyof T>(key: K) => this.requiredFields[key] = true;
    @action setIsDisabled = (flag: boolean) => this.isDisabled = flag;
    getValue = <K extends keyof T>(key: K) => this.data[key];
    isChecked = <K extends keyof T>(key: K, val: T[K]) => this.getValue(key) === val;

    getErrorMessage = <k extends keyof T>(key: k, index?: number) => {
        if (index !== undefined) {
            const errorKey = (String(key) + index) as string;
            return this.errorFields[errorKey];
        }
        return this.errorFields[key];
    }
    @action clearErrorField = <K extends keyof T>(key: K, index?: number) => {
        if (index !== undefined) return delete this.errorFields[(key as string) + index.toString()]
        for (let errorKey in this.errorFields) {
            if (errorKey.includes(key as string)) delete this.errorFields[errorKey];
        }
    };
    @action setErrorField = <K extends keyof T>(key: K, error: string, index?: number) => {
        if (index !== undefined) {
            const errorKey = (String(key) + index) as string | keyof T;
            return this.errorFields[errorKey] = error;
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
        return this.isValidate()
    }
}