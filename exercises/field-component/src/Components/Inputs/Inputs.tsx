import React from 'react';
import FormStore from "../../Stores/FormStore";
import Field from "../Field/Field";
import FormComponent from "../FormComponent";
import {action, toJS} from "mobx";
import JsonInputComponent from "../JsonInputComponent/JsonInputComponent";
import {observer} from "mobx-react-lite";
import {Button} from "reactstrap";

const inputs = {
    bags: [''],
    test:[1],
}
const formStore = new FormStore(inputs);
// @ts-ignore
window.__getDat = () => toJS(formStore);
const Inputs = () => {
    const onSubmit = (data: any) => {
        console.log(toJS(data))
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
                    render={(onChange, value, required, isDisabled, index) => {
                        return (<>
                            <JsonInputComponent
                                name={'bags'}
                                disabled={isDisabled}
                                requiredValue={required}
                                values={value}
                                index={index}
                            />
                        </>)
                    }}
                />
                <Field
                    name='test'
                    label="Test"
                    required={false}
                    render={(onChange, value, required, isDisabled, index) => {
                        return (<>
                            <JsonInputComponent
                                name={'test'}
                                disabled={isDisabled}
                                requiredValue={required}
                                values={value}
                                index={index}
                            />
                        </>)
                    }}
                />
            </FormComponent>
        </div>
    );
}
export default observer(Inputs);