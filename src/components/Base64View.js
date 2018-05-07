import React, { Component } from 'react';
import EncodingViewCore from './EncodingViewCore';
import codec from '../Codec';

class Base64View extends Component {
  filter = (input) => {
    return input.replace(/[^a-z0-9+/=]/gi, '');
  }
  
  format = (input, encoding) => {
    return btoa(codec.encode(input, encoding).join('')).split('');
  }

  parse = (input, encoding) => {
    if (input.length % 4 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return codec.decode(atob(input).split(''), encoding);
  }

  render() {
    return (
      <EncodingViewCore
        title="Base64"
        filter={this.filter}
        format={this.format}
        parse={this.parse}
        text={this.props.text}
        onChange={this.props.onChange}
        showEncoding={true}/>
    );
  }
}

export default Base64View;
