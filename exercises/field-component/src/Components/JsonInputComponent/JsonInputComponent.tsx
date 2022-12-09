import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Input} from "reactstrap";
import {FaTrash} from "react-icons/fa";
import {FormStoreContext} from "../../Stores/FormStoreContext/FormStoreContext";

interface IJsonProps<T> {
    name: keyof T,
    values: T[]
    disabled: boolean
    onChange: (data: any, index?: number) => void,
    requiredValue: boolean
    errorMessage: (errorIndex: number) => string
}

const JsonInputComponent = <T, >({name, values, requiredValue, disabled, onChange, errorMessage}: IJsonProps<T>) => {
    const formStore = useContext(FormStoreContext);
    return (
        <div>
            {values.map((e: any, index: number) => {
                return (
                    <div key={index}>
                        <div>
                            <div className='d-flex'>
                                <Input
                                    type='text'
                                    value={values[index] as string}
                                    onChange={(e) => onChange(e.target.value, index)}
                                    required={requiredValue}
                                    disabled={disabled}
                                />
                                <Button
                                    type='button'
                                    disabled={(values.length === 1 ? true : disabled)}
                                    onClick={() => onChange(values.filter((value, I) => I != index))}
                                >
                                    <FaTrash/>
                                </Button>
                            </div>
                            <div>
                                {<span className='text-danger'>{errorMessage(index)}</span>}
                            </div>
                        </div>
                    </div>
                )

            })}
            <Button
                type="button"
                className='bg-dark'
                onClick={() => onChange([...values, ''])}
                disabled={disabled}
            >ADD</Button>
        </div>
    );
}

export default observer(JsonInputComponent);
