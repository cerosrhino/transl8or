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
      text: '',
      serializedOptions: [0, 0, 0]
    };
  }

  unescapeFromURL(escapedText) {
    return escapedText
      .replace(/(@*)_/g, (match, p1) => {
        return (p1.length % 2 === 0) ? (p1 + ' ') : match
      })
      .replace(/@_/g, '_')
      .replace(/@@/g, '@');
  }

  escapeToURL(text) {
    return text
      .replace(/@/g, '@@')
      .replace(/_/g, '@_')
      .replace(/ /g, '_');
  }

  componentDidMount() {
    if (window.location.hash.length < 7) {
      return;
    }

    const base64 = window.location.hash.slice(2, 6);
    const serializedOptions = atob(base64).split('').map(
      el => el.charCodeAt(0)
    );
    const text = this.unescapeFromURL(decodeURIComponent(
      window.location.hash.slice(7)
    ));

    this.setState({
      serializedOptions,
      text
    });
  }
  
  handleChange = (value) => {
    this.setState({
      text: value
    });
  }

  handleSerialize = (which, byte) => {
    const serializedOptions = [...this.state.serializedOptions];
    serializedOptions[which] = byte;

    this.setState({
      serializedOptions
    });
  }

  handleShare = () => {
    const toBase64 = this.state.serializedOptions.map(
      el => String.fromCharCode(el)
    ).join('');
    const text = encodeURI(this.escapeToURL(this.state.text));

    window.location.hash = '/' + btoa(toBase64) + '/' + text;
  }
  
  render() {
    return (
      <div id="app">
        <div id="app__grid">
          <UnicodeView
            text={this.state.text}
            onChange={this.handleChange}/>
          <BinaryView
            text={this.state.text}
            onChange={this.handleChange}
            serializedOptions={this.state.serializedOptions[0]}
            onSerialize={this.handleSerialize.bind(this, 0)}/>
          <HexView
            text={this.state.text}
            onChange={this.handleChange}
            serializedOptions={this.state.serializedOptions[1]}
            onSerialize={this.handleSerialize.bind(this, 1)}/>
          <Base64View
            text={this.state.text}
            onChange={this.handleChange}
            serializedOptions={this.state.serializedOptions[2]}
            onSerialize={this.handleSerialize.bind(this, 2)}/>
        </div>
        <button onClick={this.handleShare}>Share</button>
      </div>
    );
  }
}

export default App;
