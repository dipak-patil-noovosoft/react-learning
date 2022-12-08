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
}
const formStore = new FormStore(inputs);
// @ts-ignore
window.__getDat = () => toJS(formStore);
const Inputs = () => {
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    const handelDelete = action((index: number) => {
        if (formStore.data.bags.length > 1) formStore.data.bags.splice(index, 1);
    })
    const addInputField = action(() => {
        formStore.clearErrorField();
        formStore.data.bags.push('');
    })
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
                                onDelete={handelDelete}
                                name={'bags'}
                                disabled={isDisabled}
                                required={true}
                                values={value}
                                index={index}
                            />
                        </>)
                    }}
                />
                <Button type="button" onClick={addInputField}>ADD</Button>
            </FormComponent>
        </div>
    );
}
export default observer(Inputs);