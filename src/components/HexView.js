import React, { Component } from 'react';
import DataView from './DataView';
import codec from '../Codec';

class HexView extends Component {
  filter = (input) => {
    return input.replace(/[^0-9a-f\s]/gi, '');
  }

  format = (input, encoding) => {
    return codec
      .encode(input, encoding)
      .map(el => el.charCodeAt(0).toString(16).padStart(2, '0'));
  }

  parse = (input, encoding) => {
    input = input.replace(/\s/g, '');
    if (input.length % 2 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return codec.decode(input.replace(
      /(.{2})/g,
      (_, match) => String.fromCharCode(parseInt(match, 16))
    ).split(''), encoding);
  }

  render() {
    return (
      <DataView
        title="Hexadecimal"
        filter={this.filter}
        format={this.format}
        parse={this.parse}
        text={this.props.text}
        onChange={this.props.onChange}
        showEncoding={true}
        showSpaces={true}
        showUppercase={true}/>
    );
  }
}

export default HexView;
