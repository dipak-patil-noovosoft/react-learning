import React, {useContext} from 'react';
import FormStore from "../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: keyof T,
    label: string,
    onChange: (val: string | number) => void,
    required: boolean,
    render: (
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        val: T[keyof T],
        required: boolean
    ) => JSX.Element
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required} = props;
    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formStore.setValue(name as keyof T, e.target.value as T[keyof T]);
    }
    return (
        <div>
            <label>{label}</label>
            {render(onChange, formStore.data[name], required)}
        </div>
    );
}

export default observer(Field);