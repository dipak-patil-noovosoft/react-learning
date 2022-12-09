import React, {useContext, useEffect} from 'react';
import FormStore from "../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";

export type TRenderProps<T> = (
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: T[keyof T],
    required: boolean,
    isDisabled: boolean,
    index: number
) => JSX.Element

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: any,
    label?: string,
    onChange?: (val: string) => void,
    required: boolean,
    render: TRenderProps<T>
    index?: number
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required, index, onChange} = props;

    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;
    useEffect(() => {
        if (required) formStore.setRequiredFields(name);
    }, [])


    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'checkbox') {
            formStore.setValue(name as keyof T, e.target.checked as T[keyof T]);
        } else {
            formStore.setValue(name as keyof T, e.target.value as T[keyof T], index);
        }
        if (onChange) {
            onChange("dipak")
        }
    }
    return (
        <div>
            <label>{label} {required && <span className='text-danger'>*</span>}</label>
            {render(
                onChangeField,
                formStore.getValue(name, index),
                required,
                formStore.isDisabled, index as number
            )}
            {<span className='text-danger'>{formStore.getErrorMessage(name, index)}</span>}
        </div>
    );
}

export default observer(Field);