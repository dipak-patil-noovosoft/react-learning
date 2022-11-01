import React, {useContext, useRef} from 'react';
import {TodoContext} from "../Contexts/TodoContext";

export const Todo = () => {
    const context = useContext(TodoContext);
    const {todoList,add,deleteItem} = context;
    const inputEL = useRef<HTMLInputElement>(null);
    const handleClick =() =>{
        if (null !== inputEL.current){
            const text = inputEL.current?.value;
            if (text.length>0) {
                add(text)
                inputEL.current.value = "";
            }
        }
    }
    const handleDelete = (id:string) =>{
        // delete (id);
        deleteItem(id);
    }
    return (
        <div>
            <h1>Todo List</h1>
            <input ref={inputEL} type="text"/>
            <button type="submit"  onClick={handleClick}>Add +</button>

            <ul>
                {todoList.map((e:any) => {
                    return <li style={{textDecoration:"none", listStyle:"none"}} key={e.id}>{e.todo}
                        <button type="submit" value={e.id} onClick={()=>handleDelete(e.id)}>
                            x
                        </button>
                    </li>
                })}
            </ul>
        </div>
    );
};