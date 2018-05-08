import React, { Component } from 'react';
import EncodingViewCore from './EncodingViewCore';
import codec from '../Codec';

class BinaryView extends Component {
  filter = (input) => {
    return input.replace(/[^01\s]/g, '');
  }

  format = (input, encoding) => {
    return codec
      .encode(input, encoding)
      .map(el => el.charCodeAt(0).toString(2).padStart(8, '0'));
  }

  parse = (input, encoding) => {
    input = input.replace(/\s/g, '');
    if (input.length % 8 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return codec.decode(input.replace(
      /.{8}/g,
      (match) => String.fromCharCode(parseInt(match, 2))
    ).split(''), encoding);
  }

  render() {
    return (
      <EncodingViewCore
        title="Binary"
        filter={this.filter}
        format={this.format}
        parse={this.parse}
        text={this.props.text}
        onChange={this.props.onChange}
        serializedOptions={this.props.serializedOptions}
        onSerialize={this.props.onSerialize}
        showEncoding={true}
        showSpaces={true}/>
    );
  }
}

export default BinaryView;
