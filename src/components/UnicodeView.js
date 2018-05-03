import React, { Component } from 'react';
import DataView from './DataView';

class UnicodeView extends DataView {
  render() {
    return (
      <div className="encoding-block">
        <p className="encoding-block__title">Text (Unicode)</p>
        <textarea
          className="encoding-block__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default UnicodeView;