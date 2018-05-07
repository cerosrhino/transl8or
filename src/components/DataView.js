import React, { Component } from 'react';
import Title from './Title';
import FormattingOptions from './FormattingOptions';
import codec from '../Codec';
import './DataView.css';

class DataView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      encoding: codec.findEncoding('UTF-8'),
      separator: '',
      useUppercase: false,
      error: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return (nextProps.format && typeof nextProps.text !== 'undefined') ? {
      value: DataView.updateValue(
        nextProps,
        prevState.encoding,
        prevState.separator,
        prevState.useUppercase
      )
    } : null;
  }

  static updateValue = (props, encoding, separator, useUppercase) => {
    let value = props.format(props.text, encoding).join(separator);
    if (useUppercase) {
      value = value.toUpperCase();
    }
    return value;
  }

  handleChange = (event) => {
    this.setState({
      value: this.props.filter(event.target.value),
      error: false
    }, () => {
      try {
        this.props.onChange(
          this.props.parse(this.state.value, this.state.encoding)
        );
      } catch (e) {
        this.setState({
          error: true
        });
      }
    });
  }
  
  handleEncodingChange = (encoding) => {
    this.setState({
      encoding,
      value: DataView.updateValue(
        this.props,
        encoding,
        this.state.separator,
        this.state.useUppercase
      )
    });
  }
  
  handleSpacesChange = (checked) => {
    const separator = checked ? ' ' : '';
    this.setState({
      separator,
      value: DataView.updateValue(
        this.props,
        this.state.encoding,
        separator,
        this.state.useUppercase
      )
    });
  }

  handleCaseChange = (useUppercase) => {
    this.setState({
      useUppercase,
      value: DataView.updateValue(
        this.props,
        this.state.encoding,
        this.state.separator,
        useUppercase
      )
    });
  }

  render() {
    let textareaClassName = 'data-view__textarea';
    if (this.state.error) {
      textareaClassName += ' data-view__textarea--error';
    }

    return (
      <div className="data-view">
        <Title
          text={this.props.title}
          onEncodingChange={this.handleEncodingChange}
          length={codec.splitByCodePoints(this.state.value).length}
          error={this.state.error}/>
        <textarea
          className={textareaClassName}
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <FormattingOptions
          onSpacesChange={this.props.spaces && this.handleSpacesChange}
          onCaseChange={this.props.uppercase && this.handleCaseChange}/>
      </div>
    )
  }
}

export default DataView;
