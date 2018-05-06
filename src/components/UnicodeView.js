import React from 'react';
import DataView from './DataView';
import Title from './Title';
import Codec from '../Codec';

class UnicodeView extends DataView {
  render() {
    return (
      <div className="data-view">
        <Title
          text="Text (Unicode)"
          length={Codec.splitByCodePoints(this.state.value).length}/>
        <textarea
          className="data-view__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default UnicodeView;
