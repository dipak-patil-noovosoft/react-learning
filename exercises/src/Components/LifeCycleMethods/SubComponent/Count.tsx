import React from "react";

type countPropa = {
    num : number
}
class Count extends React.Component<countPropa, any>{
    componentDidUpdate(prevProps: Readonly<countPropa>) {
        if (prevProps.num !== this.props.num){
            console.log("Component Updated")
        }
    }


    render()  {
        return (
            <h1>Count : {this.props.num} </h1>
        );
    }
}
export default Count;