import {createContext} from "react";
interface  ITodoItem{
    todo:string,
    id : string;
}

const todoList :ITodoItem[] = [];
const TodoContext = createContext({
    todoList, add: (x:string) => {},
    deleteItem:(x:string)=>{}
});
export {todoList, TodoContext};