import React from 'react';
import Field from "./Components/Field/Field";
import FormStore from "./Stores/FormStore";
import {observer} from "mobx-react-lite";
import FormComponent from "./Components/FormComponent";
import {Input} from "reactstrap";

const formStoreData = {email: '', name: ''}
const formStore = new FormStore(formStoreData);

function App() {
    const onChange = () => {
    }

    return (
        <div className="App">
            <FormComponent
                formStore={formStore}
                showSubmitButton={true}
                buttonText="Submit"
            >
                <Field
                    name='email'
                    label={'Email'}
                    formStore={formStore}
                    onChange={onChange}
                    required={true}
                    render={(onChange, value, required) =>
                        <Input
                            value={value}
                            onChange={onChange}
                            required={required}
                        />
                    }
                />
                <Field
                    name='name'
                    label={'Name'}
                    onChange={onChange}
                    required={false}
                    render={(onChange, value, required) =>
                        <Input
                            value={value}
                            required={required}
                            onChange={onChange}
                        />
                    }
                />
            </FormComponent>
        </div>
    )
        ;
}

export default observer(App);
