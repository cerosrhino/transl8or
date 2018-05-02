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
      throw new Error('Incorrect input');
    }

    return this.codec.decode(atob(input).split(''));
  }

  filter(input) {
    if (/[^a-z0-9+/=]/gi.test(input)) {
      throw new Error('Incorrect input');
    }
    
    return input;
  }
  
  render() {
    return (
      <div>
        <p>
          Base64 <EncodingPicker onChange={this.handleEncodingChange}/>
        </p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Base64View;