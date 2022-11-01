import React, {useCallback, useState} from 'react';
import TodoDemo from "./TodoDemo";

const UseCallback:React.FC = () => {
    const [count, setCount] = useState(0);
    const [todo, setTodo] = useState<string[]>([]);

    const addTodo = useCallback(
        () => {
            setTodo([...todo,`New Item`]);
        },
        [todo],
    );


    return (
        <div>
            <TodoDemo todo = {todo} add = {addTodo}></TodoDemo>
                Count {count}
            <button type="submit" onClick={()=>setCount(count+1)}>+</button>
        </div>
    );
};
export default UseCallback;