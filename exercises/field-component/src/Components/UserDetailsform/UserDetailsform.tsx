import React from 'react';
import {toJS} from "mobx";
import {Input} from "reactstrap";
import FormComponent from "../FormComponent";
import Select from "../select/Select";
import Field from "../Field/Field";
import FormStore from "../../Stores/FormStore";

const formStoreData = {email: '', name: '', box1: false, box2: false, gender: '', select: 'A'}

const formStore = new FormStore(formStoreData);

const UserDetailsform = () => {
    const onChange = () => {

    }
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    return (
        <div className="shadow-lg p-3  container  bg-opacity-25  my-5 px-5 py-5">
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
                <p>Check Box</p>
                <Field
                    name='box1'
                    label='Box 1'
                    required={false}
                    render={(onChange, value, required, isDisabled) =>
                        <Input
                            type='checkbox'
                            required={required}
                            onChange={onChange}
                            checked={value}
                            disabled={isDisabled}
                        />
                    }
                />
                <Field
                    name='box2'
                    label='Box 2'
                    required={false}
                    render={(onChange, value, required, isDisabled) =>
                        <Input
                            type='checkbox'
                            required={required}
                            onChange={onChange}
                            checked={value}
                            disabled={isDisabled}
                        />
                    }
                />

                <p>Radio Buttons</p>
                <Field
                    name='gender'
                    label="Male"
                    required={false}
                    render={(onChange, value, required, isDisabled) => {
                        return (<>
                            <Input
                                type='radio'
                                value='male'
                                required={required}
                                onChange={onChange}
                                name='male'
                                disabled={isDisabled}
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
                    render={(onChange, value, required, isDisabled) => {
                        return (<>
                            <Input
                                type='radio'
                                value='female'
                                required={required}
                                onChange={onChange}
                                name='female'
                                disabled={isDisabled}
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
                        return <Select
                            onChange={onChange}
                            value={value}
                            isDisabled={isDisabled}
                            options={['A', 'B', 'C']}
                        />
                    }
                    }
                />
            </FormComponent>
        </div>
    )

}

export default UserDetailsform;