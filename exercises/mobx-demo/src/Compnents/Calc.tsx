import React from 'react';
import {observer} from 'mobx-react'
import {action, computed, observable, toJS} from "mobx";
type TCalcState = {
    amount1: number,
    amount2 : number,
}
const calcSate: TCalcState = observable({
    amount1 : 0,
    amount2 : 0,
})
function Calc() {
    const total = computed(()=> calcSate.amount1 * calcSate.amount2);
    console.log()
    return (
        <>

            <>
                Product of numbers : {toJS(total)}
            </>
            <br/>
            <input type="number" placeholder='Enter Amount 1' onChange={action((e:any)=>calcSate.amount1 = e.target.value)}/>
            <input type="number"  placeholder='Enter Amount2' onChange={action((e:any)=>calcSate.amount2 = e.target.value)}/>

        </>
    );
}

export default observer(Calc);