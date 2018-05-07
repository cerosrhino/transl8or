import React, { Component } from 'react';
import Codec from '../Codec';
import './EncodingPicker.css';

class EncodingPicker extends Component {
  handleChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    return (
      <select
        className="encoding-picker"
        onChange={this.handleChange}>
        {
          Codec.encodings().map(
            (el, index) => <option key={index} value={index}>{el}</option>
          )
        }
      </select>
    )
  }
}

export default EncodingPicker;
