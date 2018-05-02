import React, { Component } from 'react';
import ChunkedDataView from './ChunkedDataView';
import EncodingPicker from './EncodingPicker';
import Toggler from './Toggler';

class HexView extends ChunkedDataView {
  constructor(props) {
    super(props);
    this.chunkLength = 2;
  }

  format(input) {
    let output = this.codec
      .encode(input)
      .map(el => el.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(this.state.separator);

    if (this.state.useUppercase) {
      output = output.toUpperCase();
    }

    return output;
  }

  parse(input) {
    input = input.replace(/\s/g, '');
    if (input.length % 2 !== 0 || /[^0-9a-f]/i.test(input)) {
      throw new Error('Incorrect input');
    }

    return this.codec.decode(input.replace(
      /(.{2})/g,
      (_, match) => String.fromCharCode(parseInt(match, 16))
    ).split(''));
  }

  filter(input) {
    if (/[^0-9a-f\s]/gi.test(input)) {
      throw new Error('Incorrect input');
    }
    return input;
  }

  handleCaseChange = (checked) => {
    this.setState((prevState, props) => ({
      useUppercase: checked,
      value: checked ?
        prevState.value.toUpperCase() :
        prevState.value.toLowerCase()
    }));
  }

  handleEncodingChange = (value) => {
    this.codec.setEncoding(value);
  }

  render() {
    return (
      <div>
        <p>
          Hexadecimal <EncodingPicker onChange={this.handleEncodingChange}/>
        </p>
        <textarea spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <Toggler text="With spaces" onChange={this.handleSpacesChange}/>
        <Toggler text="Uppercase" onChange={this.handleCaseChange}/>
      </div>
    );
  }
}

export default HexView;