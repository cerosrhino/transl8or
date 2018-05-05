import React from 'react';
import ChunkedDataView from './ChunkedDataView';
import Title from './Title';
import FormattingOptions from './FormattingOptions';

class HexView extends ChunkedDataView {
  format(input) {
    let output = this.codec
      .encode(input)
      .map(el => el.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(this.separator);

    if (this.useUppercase) {
      output = output.toUpperCase();
    }

    return output;
  }

  parse(input) {
    input = input.replace(/\s/g, '');
    if (input.length % 2 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return this.codec.decode(input.replace(
      /(.{2})/g,
      (_, match) => String.fromCharCode(parseInt(match, 16))
    ).split(''));
  }

  filter(input) {
    return input.replace(/[^0-9a-f\s]/gi, '');
  }

  handleCaseChange = (checked) => {
    this.useUppercase = checked;
    this.setState({
      value: this.format(this.props.text)
    });
  }

  render() {
    return (
      <div className="data-view">
        <Title
          text="Hexadecimal"
          onEncodingChange={this.handleEncodingChange}
          length={this.state.value.length}
          error={this.state.error}/>
        <textarea
          className={this.textareaClassName()}
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <FormattingOptions
          onSpacesChange={this.handleSpacesChange}
          onCaseChange={this.handleCaseChange}/>
      </div>
    );
  }
}

export default HexView;
