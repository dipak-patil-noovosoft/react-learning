import React, {Component} from 'react';
import FormStore from "../../Stores/FormStore";
import Field from "../FielComponentExericse/Field/Field";
import Select from "../FielComponentExericse/select/Select";

const filterPickerData = {filter: ""}
const formStore = new FormStore(filterPickerData);

class FilterPicker extends Component<{}, {}> {
    render() {
        onchange = () => {
        }
        return (
            <div>
                <h1>FilterPicker</h1>
                <Field
                    name='filter'
                    label="Filter"
                    formStore={formStore}
                    required={false}
                    render={(onChange, value, required, isDisabled, errorMessage) => {
                        return <Select
                            onChange={onChange}
                            value={value}
                            options={[
                                {key: "A", value: "A"},
                                {key: "B", value: "B"},
                                {key: "C", value: "C"},
                            ]}/>
                    }}
                />
            </div>

        );
    }
}

export default FilterPicker;