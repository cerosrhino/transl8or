import React, { Component } from 'react';
import EncodingPicker from './EncodingPicker';
import './Title.css';

class Title extends Component {
  render() {
    let counterClassName = 'title__counter';
    if (this.props.error) {
      counterClassName += ' title__counter--error';
    }

    return (
      <div className="title">
        {this.props.text}
        {' '}
        {
          this.props.onEncodingChange &&
          <EncodingPicker
            encoding={this.props.encoding}
            onChange={this.props.onEncodingChange}/>
        }
        <span className={counterClassName}>{this.props.length}</span>
      </div>
    );
  }
}

export default Title;
