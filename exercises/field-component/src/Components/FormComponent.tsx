import React from 'react';
import FormStore from "../Stores/FormStore";
import {FormStoreContext} from "../Stores/FormStoreContext/FormStoreContext";
import {Button} from "reactstrap";

interface IFromComponentProps<T extends object> {
    children: React.ReactNode[],
    formStore: FormStore<T>,
    showSubmitButton: boolean,
    buttonText?: string
    onSubmit: (data: T) => void;
}

const FormComponent = <T extends object>(props: IFromComponentProps<T>) => {
    const {formStore, showSubmitButton, buttonText, children, onSubmit} = props;
    return (
        <FormStoreContext.Provider value={formStore}>
            {children}
            {showSubmitButton &&
                <Button
                    color="primary"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            onSubmit(formStore.data)
                        }
                    }
                >
                    {buttonText ? buttonText : "SAVE"}
                </Button>
            }
        </FormStoreContext.Provider>
    );
}

export default FormComponent;