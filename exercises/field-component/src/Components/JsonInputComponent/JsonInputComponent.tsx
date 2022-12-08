import React, {useContext} from 'react';
import {toJS} from "mobx";
import Field from "../Field/Field";
import {observer} from "mobx-react-lite";
import {Button, Input} from "reactstrap";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";
import {FaTrash} from "react-icons/fa";

interface IJsonProps<T> {
    onDelete: (index: number) => void
    name: string,
    values: T[]
    disabled: boolean
    index: number
    required: boolean
}

const JsonInputComponent = <T, >({onDelete, name, values, required}: IJsonProps<T>) => {
    const formStore = useContext(FormStoreContext);
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    return (
        <div>
            {values.map((e: any, index: number) => {

                return (
                    <Field
                        key={index}
                        name={name}
                        required={required}
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
                                        onClick={() => onDelete(index)}
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
        </div>
    );
}

export default observer(JsonInputComponent);