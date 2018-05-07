import React, { Component } from 'react';
import DataView from './DataView';
import codec from '../Codec';

class Base64View extends Component {
  format = (input, encoding) => {
    return btoa(codec.encode(input, encoding).join('')).split('');
  }

  parse = (input, encoding) => {
    if (input.length % 4 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return codec.decode(atob(input).split(''), encoding);
  }

  filter(input) {
    return input.replace(/[^a-z0-9+/=]/gi, '');
  }
  
  render() {
    return (
      <DataView
        title="Base64"
        filter={this.filter}
        format={this.format}
        parse={this.parse}
        text={this.props.text}
        onChange={this.props.onChange}/>
    );
  }
}

export default Base64View;
