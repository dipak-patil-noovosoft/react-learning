import React from "react";

interface ICountPropa {
    num : number
}
class Count extends React.Component<ICountPropa, any>{
    constructor(props:ICountPropa) {
        super(props);
        console.log('Child Constructor')
    }
    componentDidMount() {
        console.log('Child componentDidMount')
    }
    componentWillUnmount() {
        console.log('Child componentWillUnmount')

    }

    componentDidUpdate(prevProps: Readonly<ICountPropa>) {
        if (prevProps.num !== this.props.num){
            console.log("child Component Updated")
        }
    }


    render()  {
        console.log("child render")
        return (
            <h1>Count : {this.props.num} </h1>
        );
    }
}
export default Count;