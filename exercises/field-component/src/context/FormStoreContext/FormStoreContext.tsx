import React from "react";
import FormStore from "../../Stores/FormStore";

const formStore = new FormStore<any>({})
export const FormStoreContext = React.createContext(formStore)