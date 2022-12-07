import {action, makeObservable, observable} from "mobx"

export default class FormStore<T extends object> {

    @observable data: T;
    @observable errorFields: Partial<Record<keyof T, string>> = {};
    @observable isDisabled: boolean = false;
    @observable requiredFields: Partial<Record<keyof T, boolean>> = {};

    constructor(data: T) {
        makeObservable(this)
        this.data = data;
    }

    @action setValue<K extends keyof T>(key: K, value: T[K]) {
        this.data[key] = value as T[K];
    }

    getValue = <K extends keyof T>(key: K) => this.data[key];
    isChecked = <K extends keyof T>(key: K, val: T[K]) => this.getValue(key) === val;
    setRequiredFields = <K extends keyof T>(key: K, flag: boolean) => this.requiredFields[key] = flag;
    getErrorMessage = <k extends keyof T>(key: k) => this.errorFields[key];
    @action clearErrorField = () => this.errorFields = {};
    @action setIsDisabled = (flag: boolean) => this.isDisabled = flag;
    @action setErrorField = <K extends keyof T>(key: K, error: string) => this.errorFields[key] = error;

    isValidate = () => {
        let flag = true;
        for (let key in this.requiredFields) {
            let currentKey = key as keyof T;
            if (this.requiredFields[key] && this.getValue(currentKey) === '') {
                this.setErrorField(currentKey, "Field Should not be empty")
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