import React from 'react';

//Class Bsase component
interface IGreetState { // IMyState
    name: string,
    isSubmit : boolean
}

class Greet extends React.Component<{}, IGreetState> {
    constructor(props:{}) {
        super(props);
        this.state = {name: "",isSubmit:false}
    }

    inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
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

export default Greet;