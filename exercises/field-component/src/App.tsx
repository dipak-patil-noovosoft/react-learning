import React from 'react';
import Field from "./Components/Field/Field";
import FormStore from "./Stores/FormStore";
import {observer} from "mobx-react-lite";
import FormComponent from "./Components/FormComponent";
import {Input} from "reactstrap";
import {toJS} from "mobx";

const formStoreData = {email: '', name: '', box1: '', box2: ''}

const formStore = new FormStore(formStoreData);

function App() {
    const onChange = () => {

    }
    const onSubmit = (data: any) => {
        console.log(toJS(data))
    }
    return (
        <div className="App">
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
                    render={(onChange, value, required) =>
                        <Input
                            type='text'
                            value={value}
                            onChange={onChange}
                            required={required}
                        />
                    }
                />
                <Field
                    name='name'
                    label='Name'
                    required={false}
                    render={(onChange, value, required) =>
                        <Input
                            type='text'
                            value={value}
                            required={required}
                            onChange={onChange}
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
                            onChange={onChange}
                            checked={formStore.getValue('box1') === 'box1'}

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
                            checked={formStore.getValue('box2') === 'box2'}
                        />
                    }
                />

            </FormComponent>
        </div>
    )

}

export default observer(App);
