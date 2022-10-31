import React, {useState} from 'react';

const UseState : React.FC = (props) =>  {
    const [name, setName] = useState({name :""});
    return (
        <div>
            <h1>Hello,{name.name}</h1>
            <input type="text" onChange={(e)=>setName({name : e.target.value})}/>
            <button type="submit" onClick={()=>{

            }}>click</button>
        </div>
    );
}

export default UseState;