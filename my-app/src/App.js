import React from 'react';
import Select from './Select'
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1> Foxconn Risk Predictor </h1>
        <Select category={"Age"}/>
      </div>
    );
  }
}