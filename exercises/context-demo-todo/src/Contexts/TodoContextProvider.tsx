import {TodoContext, todoList} from './TodoContext'
import { v4 as uuidv4 } from 'uuid';
import {useState} from "react";


const TodoContextProvider = (props: any) => {
    const [todo, setTodo] = useState(todoList);
    const add = (todoItem:string) =>{
        console.log("todo :",todo);
        const data = {todo : todoItem,id :uuidv4()};
        setTodo(todo.concat(data));
    }
    const deleteItem = (id:string)=>{
        // setTodo(todo.filter((e)=>e.id!==id))
        setTodo(todo.filter((e)=>e.id !== id))
    }
    return (
        <TodoContext.Provider value={{todoList: todo, add:add, deleteItem:deleteItem}}>
            {props.children}
        </TodoContext.Provider>
    );
}
export default TodoContextProvider;