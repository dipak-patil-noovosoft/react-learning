import React, {useContext} from 'react';
import FormStore from "../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";

export type TRenderProps<T> = (
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: T[keyof T],
    required: boolean,
    isDisabled: boolean,
) => JSX.Element

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: keyof T,
    label: string,
    onChange?: (val: string) => void,
    required: boolean,
    render: TRenderProps<T>
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required} = props;

    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'checkbox') {
            formStore.setValue(name as keyof T, e.target.checked as T[keyof T]);
        } else {
            formStore.setValue(name as keyof T, e.target.value as T[keyof T]);
        }
    }
    return (
        <div>
            <label>{label} {required && <span className='text-danger'>*</span>}</label>
            {render(onChange, formStore.getValue(name), formStore.setRequiredFields(name, required), formStore.isDisabled)}
            {<span className='text-danger'>{formStore.getErrorMessage(name)}</span>}
        </div>
    );
}

export default observer(Field);