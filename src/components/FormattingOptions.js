import React, { Component } from 'react';
import Toggler from './Toggler';
import './FormattingOptions.css';

class FormattingOptions extends Component {
  render() {
    return (
      <div className="formatting-options">
        {
          this.props.onSpacesChange &&
          <Toggler text="With spaces" onChange={this.props.onSpacesChange}/>
        }
        {
          this.props.onCaseChange &&
          <Toggler text="Uppercase" onChange={this.props.onCaseChange}/>
        }
      </div>
    )
  }
}

export default FormattingOptions;
