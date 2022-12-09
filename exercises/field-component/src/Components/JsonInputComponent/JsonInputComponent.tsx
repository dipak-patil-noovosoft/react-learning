import React, {useContext} from 'react';
import {action} from "mobx";
import Field from "../Field/Field";
import {observer} from "mobx-react-lite";
import {Button, Input} from "reactstrap";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";
import {FaTrash} from "react-icons/fa";

interface IJsonProps<T> {
    name: keyof T,
    values: T[]
    disabled: boolean
    index: number
    requiredValue: boolean
}

const JsonInputComponent = <T, >({name, values, requiredValue, disabled}: IJsonProps<T>) => {
    const formStore = useContext(FormStoreContext);

    const handelDelete = action((index: number) => {
        if (formStore.data[name].length > 1) formStore.data[name].splice(index, 1);
    })
    const addInputField = action(() => {
        formStore.clearErrorField();
        formStore.data[name].push('');
    })
    return (
        <div>
            {values.map((e: any, index: number) => {

                return (
                    <Field
                        key={index}
                        name={name}
                        required={requiredValue}
                        index={index}
                        render={(onChange, value, required, isDisabled, index) => {
                            return (
                                <div className='d-flex'>
                                    <Input
                                        type='text'
                                        value={value as string | number}
                                        onChange={onChange}
                                        required={required}
                                        disabled={isDisabled}
                                    />
                                    <Button
                                        type='button'
                                        disabled={(values.length === 1 ? true : isDisabled)}
                                        onClick={() => handelDelete(index)}
                                    >
                                        <FaTrash/>
                                    </Button>
                                </div>
                            )
                        }
                        }
                    />
                )

            })}
            <Button
                type="button"
                className='bg-dark'
                onClick={addInputField}
                disabled={disabled}
            >ADD</Button>
        </div>
    );
}

export default observer(JsonInputComponent);