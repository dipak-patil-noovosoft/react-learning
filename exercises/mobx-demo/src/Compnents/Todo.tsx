import React, {useContext} from 'react';
import {observer} from 'mobx-react'
import {TodoStoreContext, TTodos} from '../Stores/TodoStore'
import {action, observable, toJS} from "mobx";

export type TTodoText = {
    text : string
}
const todoText: TTodoText =  observable({
    text : ''
})
function Todo() {
    const {todoStore} = useContext(TodoStoreContext);
    const {todos,completedTodosCount} = todoStore;
    return (
        <div>
            <h1>Todo List</h1>
            <h2> Taks {completedTodosCount + "/"+ todos.length }</h2>
            <div className='addTodoSection'>
                <div>
                    <input type="text" onChange={action((e)=>(todoText.text = e.target.value))}/>
                    <button type="button" onClick={()=>todoStore.addTodo(toJS(todoText.text))}>Add</button>
                </div>
                <div className='todoList'>
                    <ul>
                        {todos.map((todoItem:TTodos) =>{
                            console.log(toJS(todoItem.task))
                            return(
                                <li key={todoItem.id}>
                                <input type='checkbox' onChange={action(()=>todoItem.completed = !(todoItem.completed))} />
                                    {toJS(todoItem.task)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default observer(Todo);