import React, { Component } from 'react';
import EncodingPicker from './EncodingPicker';
import './Title.css';

class Title extends Component {
  render() {
    return (
      <div className="title">
        { this.props.text }
        { ' ' }
        {
          this.props.onEncodingChange &&
          <EncodingPicker onChange={this.props.onEncodingChange}/>
        }
      </div>
    );
  }
}

export default Title;
