import React, {useState,useEffect} from 'react';

function UseEffect() {
    const [windowSize, setWindowSize] = useState(window.screen.width);

    function size() {
        // console.log(window.innerWidth)
        setWindowSize(window.innerWidth);
    }

    useEffect(() => {
        console.log("Add event")
        window.addEventListener('resize',size)
        return ()=>{
            console.log("remove Event")
            window.removeEventListener('resize',size)
        }
    });

    return (
        <div>
            <h1>UseEffect</h1>
            <h2>Screen size : {windowSize}</h2>
        </div>
    );
}

export default UseEffect;