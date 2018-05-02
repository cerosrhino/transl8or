import React, { Component } from 'react';
import Codec from '../Codec';

class EncodingPicker extends Component {
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
          Codec.encodings().map(
            (el, index) => <option key={index}>{el}</option>
          )
        }
      </select>
    )
  }
}

export default EncodingPicker;