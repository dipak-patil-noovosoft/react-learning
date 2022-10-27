import React from 'react';
import ReactDOM from 'react-dom/client';

//Class Bsase component
interface mystate {
    name: string,
    isSubmit : boolean
}

class Greet extends React.Component<any, mystate> {
    constructor(props:any) {
        super(props);
        this.state = {name: "",isSubmit:false}
        this.inputHandler = this.inputHandler.bind(this)
        this.onclickHandler = this.onclickHandler.bind(this)
    }

    inputHandler = (e:any) => {
        this.setState({...this.state,name: e.target.value,isSubmit:false});
    }
    onclickHandler = () => {
        this.setState({...this.state,isSubmit:true})
    }
    render() {
        return (
            <div>
                <h1>Hello, {(this.state.isSubmit?this.state.name : "") }</h1>
                <input type="text" value={this.state.name} onChange={this.inputHandler} />
                <button type="submit" onClick={this.onclickHandler}>Submit</button>
            </div>
        );
    }

}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Greet/>
)