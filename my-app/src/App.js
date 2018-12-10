import React from 'react';
import Select from './Select'
import LoadingButton from './LoadingButton'
import './App.css';

export default class App extends React.Component {
  state = {
    age: null,
    gender: null,
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

  render() {
    return (
      <div className="App">
        <h1> Foxconn Risk Predictor </h1>
        <Select category={"Age"} onFieldSelected={this.ageSelected}/>
        <Select category={"Gender"} onFieldSelected={this.genderSelected}/>
        
        <LoadingButton age={this.state.age} gender={this.state.gender}/>
      </div>
    );
  }
}