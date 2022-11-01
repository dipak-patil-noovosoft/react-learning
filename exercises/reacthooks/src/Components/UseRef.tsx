import React, {useEffect, useRef, useState} from 'react';

export const UseRef = () => {

    const divEl = useRef<HTMLDivElement|null>(null);
    const click = () => {
        if (null !== divEl.current) {
            if (divEl.current.style.backgroundColor === "black") {
                divEl.current.style.color = "black";
                divEl.current.style.backgroundColor = "yellow";
            } else {
                divEl.current.style.backgroundColor = "black";
                divEl.current.style.color = "yellow";
            }
        }
        // inputEl.current.focus();
    };
    return (
        <>
            <h1>useRef</h1>
            <div style={{height:50}} ref={divEl} onClick={click}>click me</div>
        </>
    );
};