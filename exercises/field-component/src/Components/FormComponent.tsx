import React from 'react';
import FormStore from "../Stores/FormStore";
import {FormStoreContext} from "../Stores/FormStoreContext/FormStoreContext";
import {Button} from "reactstrap";
import {observer} from "mobx-react-lite";

interface IFromComponentProps<T extends object> {
    children: React.ReactNode[] | React.ReactNode,
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
                    className='my-2'
                    color="primary"
                    disabled={formStore.isDisabled}
                    onClick={
                        (e) => {
                            e.preventDefault();
                            const check = formStore.onSubmit();
                            if (!check) return;
                            onSubmit(formStore.data)
                            formStore.setIsDisabled(true);
                        }
                    }
                >
                    {buttonText ? buttonText : "SAVE"}
                </Button>
            }
        </FormStoreContext.Provider>
    );
}

export default observer(FormComponent);