import React, { Component } from 'react';
import EncodingViewCore from './EncodingViewCore';

class UnicodeView extends Component {
  filter = (input) => {
    return input;
  }

  format = (input) => {
    return input.split('');
  }

  parse = (input) => {
    return input;
  }

  render() {
    return (
      <EncodingViewCore
        title="Text (Unicode)"
        filter={this.filter}
        format={this.format}
        parse={this.parse}
        text={this.props.text}
        onChange={this.props.onChange}/>
    );
  }
}

export default UnicodeView;
