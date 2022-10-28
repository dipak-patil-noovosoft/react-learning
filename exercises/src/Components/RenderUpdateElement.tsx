import React from 'react'

// Functiom Base

// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     root.render(element);
// }
//
// setInterval(tick, 1000);


// Class Base
interface myState {
    date: Date,
}

class Tick extends React.Component<any, myState> {

    public timerID  = 0;
    constructor(props: any) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = window.setInterval(() => this.currentTime(), 1000);
    }

   currentTime() {
        this.setState({
            date: new Date()
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Tick;