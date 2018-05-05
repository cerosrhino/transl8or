import React from 'react';
import ChunkedDataView from './ChunkedDataView';
import Title from './Title';
import FormattingOptions from './FormattingOptions';

class BinaryView extends ChunkedDataView {
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
      <div className="data-view">
        <Title
          text="Binary"
          onEncodingChange={this.handleEncodingChange}
          length={this.state.value.length}/>
        <textarea
          className="data-view__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <FormattingOptions onSpacesChange={this.handleSpacesChange}/>
      </div>
    );
  }
}

export default BinaryView;
