import React from 'react';
import {Input} from "reactstrap";

interface IRenderProps<T extends object> {
    onChange: (val: T[keyof T], index?: number) => void,
    value: string,
    isDisabled?: boolean,
    options: { key: string, value: string }[];
}

const Select = <T extends object>(props: IRenderProps<T>) => {
    const {onChange, value, isDisabled, options} = props;
    return (
        <div>
            <Input
                type="select"
                value={value}
                onChange={() => onChange(options as T[keyof T])}
                disabled={isDisabled}
            >{
                options.map((e) => {
                    return <option key={e.key} value={e.value}>{e.value}</option>
                })
            }
            </Input>
        </div>
    );
}

export default Select;