import React, { Component } from 'react';
import EncodingPicker from './EncodingPicker';
import './Title.css';

class Title extends Component {
  render() {
    return (
      <p className="title">
        { this.props.text }
        &nbsp;
        {
          this.props.onEncodingChange &&
          <EncodingPicker onChange={this.props.onEncodingChange}/>
        }
      </p>
    );
  }
}

export default Title;
