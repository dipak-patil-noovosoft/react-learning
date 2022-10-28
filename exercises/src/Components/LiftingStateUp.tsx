import React, {ChangeEventHandler} from 'react';


interface ITempProp {
    temperature: string,
    onTemperatureChange : (x:string) => void,
    scale :string
}
type scale ={c : string,f : string}
const scaleNames : any = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

interface  calState {
    temperature : string,
    scale : string
}

type convert = (x:number) => number ;

function toCelsius(fahrenheit : number) :number {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius :number) :number {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature :string, convert:convert) {
    const input :number = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props :{celsius:number}) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}


class TemperatureInput extends React.Component<ITempProp,{} > {
    constructor(props:ITempProp) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale  = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}


class Calculator extends React.Component<{} , calState> {
    constructor(props: {}) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature : string) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature : string) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

export default Calculator;