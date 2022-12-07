import React from 'react';
import Field from "./Components/Field/Field";
import FormStore from "./Stores/FormStore";
import {observer} from "mobx-react-lite";
import FormComponent from "./Components/FormComponent";
import {Input} from "reactstrap";
import {toJS} from "mobx";

const formStoreData = {email: '', name: '', box1: false, box2: false, gender: '', select: 'A'}

const formStore = new FormStore(formStoreData);

function App() {
    const onChange = () => {

    }
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    return (
        <div className="App card">
            <FormComponent
                formStore={formStore}
                showSubmitButton={true}
                buttonText="Submit"
                onSubmit={onSubmit}
            >
                <Field
                    name='email'
                    label={'Email'}
                    formStore={formStore}
                    required={true}
                    render={(onChange, value, required, isDisabled) =>
                        <Input
                            type='email'
                            value={value as string}
                            onChange={onChange}
                            required={required}
                            disabled={isDisabled}
                        />
                    }
                />
                <Field
                    name='name'
                    label='Name'
                    required={true}
                    render={(onChange, value, required, isDisabled) =>
                        <Input
                            type='text'
                            value={value as string}
                            required={required}
                            onChange={onChange}
                            disabled={isDisabled}
                        />
                    }
                />
                <h4>Check Box</h4>
                <Field
                    name='box1'
                    label='Box 1'
                    required={false}
                    render={(onChange, value, required) =>
                        <Input
                            type='checkbox'
                            required={required}
                            value={value}
                            onChange={onChange}
                            checked={value}
                        />
                    }
                />
                <Field
                    name='box2'
                    label='Box 2'
                    required={false}
                    render={(onChange, value, required) =>
                        <Input
                            type='checkbox'
                            required={required}
                            onChange={onChange}
                            checked={value}
                        />
                    }
                />

                <h4>Radio Buttons</h4>
                <Field
                    name='gender'
                    label="Male"
                    required={false}
                    render={(onChange, value, required) => {
                        return (<>
                            <Input
                                type='radio'
                                required={required}
                                onChange={onChange}
                                name='male'
                                checked={formStore.isChecked('gender', 'male')}
                            />
                        </>)
                    }
                    }
                />
                <Field
                    name='gender'
                    label="Female"
                    required={false}
                    render={(onChange, value, required) => {
                        return (<>
                            <Input
                                type='radio'
                                required={required}
                                onChange={onChange}
                                name='female'
                                checked={formStore.isChecked('gender', 'female')}
                            />
                        </>)
                    }
                    }
                />
                <Field
                    name='select'
                    label='Select'
                    required={false}
                    render={(onChange, value, required, isDisabled) => {
                        return <Input
                            type='select'
                            onChange={onChange}
                            value={value}
                            disabled={isDisabled}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </Input>
                    }
                    }
                />
            </FormComponent>
        </div>
    )

}

export default observer(App);
