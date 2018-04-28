import React, { Component } from 'react';

class Toggler extends Component {
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked
    });

    this.props.onChange(event.target.checked);
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}/> {this.props.text}
      </label>
    );
  }
}

export default Toggler;