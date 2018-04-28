import React, { Component } from 'react';
import ChunkedDataView from './ChunkedDataView';
import Toggler from './Toggler';

class BinaryView extends ChunkedDataView {
  constructor(props) {
    super(props);
    this.chunkLength = 8;
  }

  format(input) {
    return Array.prototype.map.call(encodeURIComponent(input).replace(
      /%([0-9a-f]{2})/gi,
      (_, match) => String.fromCharCode(parseInt(match, 16))
    ), (el) => el.charCodeAt(0).toString(2).padStart(8, '0')).join(
      this.state.separator
    );
  }

  parse(input) {
    input = input.replace(/\s/g, '');
    if (input.length % 8 !== 0 || /[^01]/i.test(input)) {
      throw 'Incorrect input';
    }

    return decodeURIComponent(
      input.replace(/(.{8})/g, (_, match) => {
        return '%' + parseInt(match, 2).toString(16).padStart(2, '0')
      })
    );
  }

  filter(input) {
    if (/[^01\s]/g.test(input)) {
      throw 'Incorrect input';
    }
    return input;
  }

  render() {
    return (
      <div>
        <p>Binary</p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <Toggler text="With spaces" onChange={this.handleSpacesChange}/>
      </div>
    );
  }
}

export default BinaryView;