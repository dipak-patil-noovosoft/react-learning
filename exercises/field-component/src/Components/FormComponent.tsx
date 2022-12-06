    import React from 'react';
import FormStore from "../Stores/FormStore";
import {FormStoreContext} from "../Stores/FormStoreContext/FormStoreContext";
import {Button} from "reactstrap";

interface IFromComponentProps<T extends object> {
    children: React.ReactNode[],
    formStore: FormStore<T>,
    showSubmitButton: boolean,
    buttonText: string
}

const FormComponent = <T extends object>(props: IFromComponentProps<T>) => {
    const {formStore, showSubmitButton, buttonText} = props;
    return (
        <FormStoreContext.Provider value={formStore}>
            {props.children}
            {showSubmitButton &&
                <Button color="primary">
                    {buttonText}
                </Button>
            }
        </FormStoreContext.Provider>
    );
}

export default FormComponent;