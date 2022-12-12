import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Input} from "reactstrap";
import {FaTrash} from "react-icons/fa";

interface IJsonProps<T> {
    values: T[]
    disabled: boolean
    onChange: (data: T[keyof T], index?: number) => void,
    requiredValue: boolean
    errorMessage: (errorIndex: number) => string
}

const JsonInputComponent = <T, >({values, requiredValue, disabled, onChange, errorMessage}: IJsonProps<T>) => {
    return (
        <div>
            {values.map((e, index: number) => {
                return (
                    <div key={index}>
                        <div>
                            <div className='d-flex'>
                                <Input
                                    type='text'
                                    value={values[index] as string}
                                    onChange={(e) => {
                                        return onChange(values.map((val, i) => (i === index) ? e.target.value : val) as T[keyof T], index);
                                    }}
                                    required={requiredValue}
                                    disabled={disabled}
                                />
                                <Button
                                    type='button'
                                    disabled={(values.length === 1 ? true : disabled)}
                                    onClick={() => onChange(values.filter((value, I) => I != index) as T[keyof T])}
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
                onClick={() => onChange([...values, ''] as T[keyof T])}
                disabled={disabled}
            >ADD</Button>
        </div>
    );
}

export default observer(JsonInputComponent);
