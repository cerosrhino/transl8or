import React from 'react';
import DataView from './DataView';
import Title from './Title';

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
      <div className="data-view">
        <Title
          text="Base64"
          onEncodingChange={this.handleEncodingChange}/>
        <textarea
          className="data-view__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Base64View;
