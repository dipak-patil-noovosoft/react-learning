import React, {useContext} from 'react';
import FormStore from "../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: keyof T,
    label: string,
    onChange?: (val: string) => void,
    required: boolean,
    render: (
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
        value: T[keyof T],
        required: boolean,
        isDisabled: boolean,
    ) => JSX.Element
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required} = props;
    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.type === 'text') formStore.setValue(name as keyof T, e.target.value as T[keyof T]);
        if (e.target.type === 'checkbox') {
            const value = formStore.getValue(name)
            formStore.setValue(name as keyof T, !(value) as T[keyof T]);
        }
        if (e.target.type === 'radio') {
            formStore.setValue(name as keyof T, e.target.name as T[keyof T]);
        }
        if (e.target.type === 'select-one') {
            formStore.setValue(name as keyof T, e.target.value as T[keyof T]);
        }
    }
    return (
        <div>
            <label>{label} {required && <span style={{color: 'red'}}>*</span>}</label>
            {render(onChange, formStore.getValue(name), formStore.setRequiredFields(name, required), formStore.isDisabled)}
            {<span className='text-danger'>{formStore.getErrorMessage(name)}</span>}
        </div>
    );
}

export default observer(Field);