import React, { Component } from 'react';
import './Toggler.css';

class Toggler extends Component {
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      checked: nextProps.checked
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
      <label className="toggler">
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}/> {this.props.text}
      </label>
    );
  }
}

export default Toggler;
