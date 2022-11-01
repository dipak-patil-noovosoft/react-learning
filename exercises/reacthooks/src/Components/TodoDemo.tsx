import React from 'react';
interface IProp{
    todo : string[],
    add  :()=>void;
}
function TodoDemo(props : IProp) {
    const {todo,add} = props;
    console.log('render')
    return (
        <div>
            {todo.map((e,index)=>{
                return <h4 key={index}>{`${e} ${index}`}</h4>
            })}

            <button type="submit" onClick={add}>Add Todo</button>
        </div>
    );
}

export default React.memo(TodoDemo);