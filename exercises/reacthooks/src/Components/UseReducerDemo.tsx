import {useReducer} from 'react'

interface  ICounter {
    count : number
}
const initialState = {count: 0};
const reducer = (state: ICounter, action: any) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}
const useReducerDemo = () => {


    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <h1>use Reduce</h1>
            <h2>
                Count: {state.count}
            </h2>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    )
}
export default useReducerDemo;