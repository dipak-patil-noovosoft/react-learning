import {TodoContext, todoList} from './TodoContext'
import {v4 as uuidv4} from 'uuid';
import React, {useState} from "react";


const TodoContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const [todo, setTodo] = useState(todoList);
    const add = (todoItem: string) => {
        const data = {todo: todoItem, id: uuidv4()};
        setTodo(todo.concat(data));
    }
    const deleteItem = (id: string) => {
        setTodo(todo.filter((e) => e.id !== id))
    }
    return (
        <TodoContext.Provider value={{todoList: todo, add: add, deleteItem: deleteItem}}>
            {props.children}
        </TodoContext.Provider>
    );
}
export default TodoContextProvider;