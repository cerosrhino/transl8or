import React, { Component } from 'react';
import UnicodeView from './components/UnicodeView';
import BinaryView from './components/BinaryView';
import HexView from './components/HexView';
import Base64View from './components/Base64View';
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
      <div className="App">
        <div id="App-grid">
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