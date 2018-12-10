import React from 'react';
import Select from './Select'
import LoadingButton from './LoadingButton'
import './App.css';

export default class App extends React.Component {
  state = {
    age: null,
    gender: null,
    factory: null,
  }
  
  ageSelected = (selected) => {
    this.setState({
      age: selected,
    });
  }

  genderSelected = (selected) => {
    this.setState({
      gender: selected,
    });
  }

  factorySelected = (selected) => {
    this.setState({
      factory: selected,
    });
  }

  render() {
    return (
      <div className="App">
        <h1> Foxconn Risk Predictor </h1>
        <div id="subtitle"> Enter your information below: </div>
        
        <Select category={"Age"} onFieldSelected={this.ageSelected}/>
        <Select category={"Gender"} onFieldSelected={this.genderSelected}/>
        <Select category={"Factory"} onFieldSelected={this.factorySelected}/>
        
        <LoadingButton age={this.state.age} gender={this.state.gender}/>
      </div>
    );
  }
}