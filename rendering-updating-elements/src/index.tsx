import React from 'react'
import ReactDOM from 'react-dom/client'

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
interface myState  {
    date : Date,
}
class Tick extends React.Component<any, myState>{
    constructor(props:any) {
        super(props);
        this.state = {date : new Date()} ;
    }

    componentDidMount() {
      setInterval(
            () => this.currentTime(),
            1000
        );
    }
    currentTime() {
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is  {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root')as HTMLElement);
root.render(
    <Tick></Tick>
)