import React from "react";
import FormStore from "../FormStore";

const formStore = new FormStore<any>({})
export const FormStoreContext = React.createContext(formStore)