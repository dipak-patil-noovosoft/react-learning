import React from 'react';
import {Input} from "reactstrap";

interface IRenderProps<T extends object> {
    onChange: (e: React.ChangeEvent<HTMLInputElement >) => void,
    value: string,
    isDisabled?: boolean,
    options: string[];
}

const Select = <T extends object>(props: IRenderProps<T>) => {
    const {onChange, value, isDisabled, options} = props;
    return (
        <div>
            <Input
                type="select"
                value={value}
                onChange={onChange}
                disabled={isDisabled}
            >{
                options.map((e) => {
                    return <option key={e}>{e}</option>
                })
            }
            </Input>
        </div>
    );
}

export default Select;