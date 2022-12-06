import React, {useContext} from 'react';
import FormStore from "../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";
import {toJS} from "mobx";

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: keyof T,
    label: string,
    onChange?: (val: string | number) => void,
    required: boolean,
    render: (
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        val: T[keyof T],
        required: boolean,
    ) => JSX.Element
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required} = props;
    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.type === 'text') formStore.setValue(name as keyof T, e.target.value as T[keyof T]);
        if (e.target.type === 'checkbox') {
            const value = formStore.getValue(name)
            formStore.setValue(name as keyof T, ((value.length===0) ? name : '' as T[keyof T]));
        }
    }
    return (
        <div>
            <label>{label}</label>
            {render(onChange, formStore.getValue(name), required)}
        </div>
    );
}

export default observer(Field);