import React, {useContext} from 'react';
import FormStore from "../../../Stores/FormStore";
import {observer} from "mobx-react-lite";
import {FormStoreContext} from "../../../Context/FormStoreContext/FormStoreContext";

export type TRenderProps<T> = (
    onChange: (val: T[keyof T], index?: number) => void,
    value: T[keyof T],
    required: boolean,
    isDisabled: boolean,
    errorMessage: (errorIndex: number) => string,
) => JSX.Element

interface IFieldProps<T extends object> {
    formStore?: FormStore<T>,
    name: any,
    label?: string,
    onChange?: (val: T[keyof T], index?: number) => void,
    required: boolean,
    render: TRenderProps<T>,
}

const Field = <T extends object>(props: IFieldProps<T>) => {
    const {render, label, name, required} = props;

    let formStore = useContext(FormStoreContext);
    if (props.formStore) formStore = props.formStore;

    if (required) formStore.setRequiredFields(name);

    const onChangeField = (value: T[keyof T], index?: number) => {
        formStore.setValue(name, value);
        formStore.clearErrorField(name, index);
    }
    return (
        <div>
            <label>{label} {required && <span className='text-danger'>*</span>}</label>
            {render(
                onChangeField,
                formStore.getValue(name),
                required,
                formStore.isDisabled,
                (errorIndex) => formStore.getErrorMessage(name, errorIndex) as string,
            )}
            {<span className='text-danger'>{formStore.getErrorMessage(name)}</span>}
        </div>
    );
}

export default observer(Field);