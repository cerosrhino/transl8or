import React from 'react';
import DataView from './DataView';
import Title from './Title';

class Base64View extends DataView {
  format(input) {
    return btoa(this.codec.encode(input).join(''));
  }

  parse(input) {
    if (input.length % 4 !== 0) {
      throw new Error('Incorrect number of characters');
    }

    return this.codec.decode(atob(input).split(''));
  }

  filter(input) {
    return input.replace(/[^a-z0-9+/=]/gi, '');
  }
  
  render() {
    return (
      <div className="data-view">
        <Title
          text="Base64"
          onEncodingChange={this.handleEncodingChange}
          length={this.state.value.length}
          error={this.state.error}/>
        <textarea
          className={this.textareaClassName()}
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Base64View;
