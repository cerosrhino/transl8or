import React from 'react';
import DataView from './DataView';
import Title from './Title';

class UnicodeView extends DataView {
  render() {
    return (
      <div className="data-view">
        <Title text="Text (Unicode)"/>
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
