import React, {useState} from 'react';

function UseState() {
    const [name, setName] = useState({name :""});
    return (
        <div>
            <h1>Hello,{name.name}</h1>
            <input type="text" onChange={(e)=>setName({name : e.target.value})}/>
        </div>
    );
}

export default UseState;