import React, { Component } from 'react';
import Codec from '../Codec';

class EncodingPicker extends Component {
  constructor() {
    super();

    this.options = Codec.encodings();
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