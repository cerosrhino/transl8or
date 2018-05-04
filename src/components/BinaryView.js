import React from 'react';
import ChunkedDataView from './ChunkedDataView';
import EncodingPicker from './EncodingPicker';
import Toggler from './Toggler';

class BinaryView extends ChunkedDataView {
  constructor(props) {
    super(props);
    this.chunkLength = 8;
  }

  format(input) {
    return this.codec
      .encode(input)
      .map(el => el.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(this.separator);
  }

  parse(input) {
    input = input.replace(/\s/g, '');
    if (input.length % 8 !== 0 || /[^01]/i.test(input)) {
      throw new Error(
        'Incorrect number of characters or illegal characters(s) in input'
      );
    }

    return this.codec.decode(input.replace(
      /(.{8})/g,
      (_, match) => String.fromCharCode(parseInt(match, 2))
    ).split(''));
  }

  filter(input) {
    if (/[^01\s]/g.test(input)) {
      throw new Error('Illegal character(s) in input');
    }
    
    return input;
  }

  render() {
    return (
      <div>
        <p>
          Binary <EncodingPicker onChange={this.handleEncodingChange}/>
        </p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <Toggler text="With spaces" onChange={this.handleSpacesChange}/>
      </div>
    );
  }
}

export default BinaryView;