import React, { Component } from 'react';
import DataView from './DataView';
import Toggler from './Toggler';

class Base64View extends DataView {
  format(input) {
    return btoa(encodeURIComponent(input).replace(
      /%([0-9a-f]{2})/gi,
      (_, match) => String.fromCharCode(parseInt(match, 16))
    ));
  }

  parse(input) {
    if (input.length % 4 !== 0 || /[^a-z0-9+=]/gi.test(input)) {
      throw new Error('Incorrect input');
    }

    return decodeURIComponent(atob(input).replace(
      /./g,
      (match) => ('%' + match.charCodeAt(0).toString(16).padStart(2, '0'))
    ));
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
        <p>Base64</p>
        <textarea
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default Base64View;