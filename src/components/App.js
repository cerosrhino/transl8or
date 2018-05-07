import React, { Component } from 'react';
import UnicodeView from './UnicodeView';
import BinaryView from './BinaryView';
import HexView from './HexView';
import Base64View from './Base64View';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }
  
  handleChange = (value) => {
    this.setState({
      text: value
    });
  }
  
  render() {
    return (
      <div id="app">
        <div id="app__grid">
          <UnicodeView text={this.state.text} onChange={this.handleChange}/>
          <BinaryView text={this.state.text} onChange={this.handleChange}/>
          <HexView text={this.state.text} onChange={this.handleChange}/>
          <Base64View text={this.state.text} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default App;
