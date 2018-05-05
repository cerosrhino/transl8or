import React, { Component } from 'react';
import EncodingPicker from './EncodingPicker';
import './Title.css';

class Title extends Component {
  render() {
    let counterClass = 'title__counter';
    if (this.props.error) {
      counterClass += ' title__counter--error';
    }

    return (
      <div className="title">
        {this.props.text}
        {' '}
        {
          this.props.onEncodingChange &&
          <EncodingPicker onChange={this.props.onEncodingChange}/>
        }
        <span className={counterClass}>{this.props.length}</span>
      </div>
    );
  }
}

export default Title;
