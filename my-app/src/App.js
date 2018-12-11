import React from 'react';
import Select from './Select'
import LoadingButton from './LoadingButton'
import {accident_text, suicide_text, action_text} from './constants.js';
import './App.css';

export default class App extends React.Component {
  state = {
    age: null,
    gender: null,
    factory: null,
    responseReceived: false,
    accidentRisk: null,
    suicideRisk: null,
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

  onResponse = (items) => {
    this.setState({
      responseReceived: true,
      accidentRisk: items.accident_risk,
      suicideRisk: items.suicide_risk,
    });
  }

  render() {
    return (
      <div>

        <div className="App">
          <h1> Foxconn Risk Predictor </h1>
          <div id="subtitle"> Enter your information below: </div>
          
          <Select category={"Age"} onFieldSelected={this.ageSelected}/>
          <Select category={"Gender"} onFieldSelected={this.genderSelected}/>
          <Select category={"Factory"} onFieldSelected={this.factorySelected}/>
          
          <LoadingButton age={this.state.age} gender={this.state.gender} factory={this.state.factory} onResponse={this.onResponse}/>
        </div>

        <div className="Response">
          {this.state.responseReceived ? 
          <div>
            <p>
              {accident_text[0]}
              <strong>{this.state.accidentRisk}</strong>
              {accident_text[1]}
            </p>
              
            <p>
              {suicide_text[0]}
              <strong>{this.state.suicideRisk}</strong>
              {suicide_text[1]}
            </p>

            <p>
              {action_text[0]}
              <a href="http://www.sacom.hk" target="_blank">sacom.hk</a>
              {action_text[1]}
            </p>
          </div>
          : null}
        </div>

      </div>
    );
  }
}