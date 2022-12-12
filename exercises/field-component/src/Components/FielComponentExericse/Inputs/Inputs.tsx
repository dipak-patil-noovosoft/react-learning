import React from 'react';
import FormStore from "../../../Stores/FormStore";
import Field from "../Field/Field";
import FormComponent from "../FormComponent";
import {toJS} from "mobx";
import JsonInputComponent from "../JsonInputComponent/JsonInputComponent";
import {observer} from "mobx-react-lite";


const inputs = {
    bags: [''],
    test: [''],
}
const formStore = new FormStore(inputs);
// @ts-ignore
window.__getDat = () => toJS(formStore);
const Inputs = () => {
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    const onChange = () => {

    }

    return (
        <div className='shadow-lg p-3  container  bg-opacity-25  my-5 px-5 py-5'>
            <FormComponent
                formStore={formStore}
                showSubmitButton={true}
                buttonText="Submit"
                onSubmit={onSubmit}
            >
                <Field
                    name='bags'
                    label="Bag"
                    required={true}
                    render={(onChange, value, required, isDisabled, errorMessage) => {
                        return (<>
                            <JsonInputComponent
                                name='bags'
                                disabled={isDisabled}
                                requiredValue={required}
                                onChange={onChange}
                                values={value}
                                errorMessage={errorMessage}
                            />
                        </>)
                    }}
                />
                <Field
                    name='test'
                    label="Test"
                    required={false}
                    render={(onChange, value, required, isDisabled, errorMessage) => {
                        return (<>
                            <JsonInputComponent
                                name='test'
                                disabled={isDisabled}
                                requiredValue={required}
                                onChange={onChange}
                                values={value}
                                errorMessage={errorMessage}
                            />
                        </>)
                    }}
                />
            </FormComponent>
        </div>
    );
}
export default observer(Inputs);