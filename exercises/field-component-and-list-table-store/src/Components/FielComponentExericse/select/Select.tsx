import React from 'react';
import {Input} from "reactstrap";
import {observer} from "mobx-react-lite";

interface IRenderProps<T extends object> {
    onChange: (val: string, index?: number) => void,
    value: string,
    isDisabled?: boolean,
    options: { key: string, value: string }[];
    onSearch?: (value: string) => void
}

const Select = <T extends object>(props: IRenderProps<T>) => {
    const {onChange, value, isDisabled, options, onSearch} = props;
    return (
        <div>
            <Input
                type="select"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    if (onSearch) onSearch(e.target.value)
                }}
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

export default observer(Select);