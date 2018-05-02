import React, { Component } from 'react';
import DataView from './DataView';

class UnicodeView extends DataView {
  render() {
    return (
      <div>
        <p>Text (Unicode)</p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default UnicodeView;