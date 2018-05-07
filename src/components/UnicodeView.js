import React, { Component } from 'react';
import DataView from './DataView';
import Title from './Title';

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
      <DataView
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
