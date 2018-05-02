import React, { Component } from 'react';
import Codec from '../Codec';

class EncodingPicker extends Component {
  constructor() {
    super();

    this.options = [];
    for (let encoding of Codec.encodings()) {
      this.options.push(Symbol.keyFor(encoding));
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });

    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        {
          this.options.map((el, index) => <option key={index}>{el}</option>)
        }
      </select>
    )
  }
}

export default EncodingPicker;