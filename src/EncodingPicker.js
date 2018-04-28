import React, { Component } from 'react';

class EncodingPicker extends Component {
  constructor() {
    super();

    this.options = [
      'UTF-8',
      'UTF-16BE',
      'UTF-16LE',
      'UTF-32BE',
      'UTF-32LE'
    ]
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