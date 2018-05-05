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
        <span className="title__counter">{this.props.length}</span>
      </div>
    );
  }
}

export default Title;
