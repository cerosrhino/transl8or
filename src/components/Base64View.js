import React, { Component } from 'react';
import DataView from './DataView';
import EncodingPicker from './EncodingPicker';
import Toggler from './Toggler';

class Base64View extends DataView {
  format(input) {
    return btoa(this.codec.encode(input).join(''));
  }

  parse(input) {
    if (input.length % 4 !== 0 || /[^a-z0-9+=]/gi.test(input)) {
      throw new Error(
        'Incorrect number of characters or illegal character(s) in input'
      );
    }

    return this.codec.decode(atob(input).split(''));
  }

  filter(input) {
    if (/[^a-z0-9+/=]/gi.test(input)) {
      throw new Error('Illegal character(s) in input');
    }
    
    return input;
  }
  
  render() {
    return (
      <div className="encoding-block">
        <p className="encoding-block__title">
          Base64 <EncodingPicker onChange={this.handleEncodingChange}/>
        </p>
        <textarea
          className="encoding-block__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Base64View;