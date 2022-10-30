import React from 'react';
import Count from './SubComponent/Count'
type appState = {
    count: number
}
// {}
class LifeCycleMethods extends React.Component<any, appState> {
    constructor(props: any) {
        super(props);
        this.state = {count: 0}
        console.log("Constructor")
    }


    componentDidMount() {
        console.log("componentDidMount")
    }

    handleClick = () =>{
        this.setState({count :this.state.count+1})
    }


    render() {
        console.log("Inside render")
        return (
            <div>
                <Count num = {this.state.count}></Count>
                <button onClick={this.handleClick}>Click</button>
            </div>
        );
    }
}

export default LifeCycleMethods;
