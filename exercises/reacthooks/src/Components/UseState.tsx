import React, {useState} from 'react';

const UseState : React.FC = (props) =>  {
    const [name, setName] = useState({name :""});
    return (
        <div>
            <h1>Hello,{name.name}</h1>
            Enter name : <input type="text" onChange={(e)=>setName({name : e.target.value})}/>

        </div>
    );
}

export default UseState;