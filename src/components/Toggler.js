import React, { Component } from 'react';
import './Toggler.css';

class Toggler extends Component {
  handleChange = (event) => {
    this.props.onChange(event.target.checked);
  }

  render() {
    return (
      <label className="toggler">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.handleChange}/> {this.props.text}
      </label>
    );
  }
}

export default Toggler;
