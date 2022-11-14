import {makeObservable, observable, action ,autorun,computed} from 'mobx'
import React,{createContext} from "react";
export type TTodos = {
    id :number,
    task: string,
    completed: boolean
};
export  default class TodoStore{
    todos:TTodos[] = []
    todoId = 0;
    constructor() {
        makeObservable(this,{
            todos : observable,
            completedTodosCount: computed,
            report: computed,
            addTodo: action,
        });
        autorun(()=>console.log(this.report));
    }
    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed
        ).length;
    }
    get report(){
        this.todoId++;
        if (!this.todos.length) return "<No items>"
        const nextTodo = this.todos.find((todo)=>!todo.completed)
        return `Next Todo : ${nextTodo ? nextTodo.task : "<No task>"}. Progress : ${this.completedTodosCount}/${this.todos.length}`
    }

    addTodo(task:string) {
        this.todos.push({
            id : this.todoId,
            task: task,
            completed: false
        });
    }
}

const todoStore = new TodoStore();

export const TodoStoreContext = createContext({todoStore});
export const TodoStoreProvider = (props: any) =>{
    return(
        <TodoStoreContext.Provider  value={{todoStore}}>
            {props.children}
        </TodoStoreContext.Provider>
    )
}
