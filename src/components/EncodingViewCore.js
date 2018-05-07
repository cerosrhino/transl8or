import React, { Component } from 'react';
import Title from './Title';
import FormattingOptions from './FormattingOptions';
import codec from '../Codec';
import './EncodingViewCore.css';

class EncodingViewCore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      serializedOptions: 0,
      encoding: codec.findEncoding('UTF-8'),
      useSpaces: false,
      useUppercase: false,
      error: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const serializedOptions = nextProps.serializedOptions;
    const encoding = ((serializedOptions >> 5) & 0b111);
    const useSpaces = !!((serializedOptions >> 4) & 1);
    const useUppercase = !!((serializedOptions >> 3) & 1);

    return {
      serializedOptions: nextProps.serializedOptions,
      encoding,
      useSpaces,
      useUppercase,
      value: EncodingViewCore.updateValue(
        nextProps,
        encoding,
        useSpaces,
        useUppercase
      )
    };
  }

  static updateValue = (props, encoding, useSpaces, useUppercase) => {
    let value = props.format(props.text, encoding).join(useSpaces ? ' ' : '');
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
    let serializedOptions = this.state.serializedOptions & 0b00011111;
    serializedOptions |= (encoding << 5);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      encoding,
      value: EncodingViewCore.updateValue(
        this.props,
        encoding,
        this.state.useSpaces,
        this.state.useUppercase
      )
    });
  }
  
  handleSpacesChange = (useSpaces) => {
    let serializedOptions = this.state.serializedOptions & 0b11101111;
    serializedOptions |= (useSpaces << 4);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      useSpaces,
      value: EncodingViewCore.updateValue(
        this.props,
        this.state.encoding,
        useSpaces,
        this.state.useUppercase
      )
    });
  }

  handleCaseChange = (useUppercase) => {
    let serializedOptions = this.state.serializedOptions & 0b11110111;
    serializedOptions |= (useUppercase << 3);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      useUppercase,
      value: EncodingViewCore.updateValue(
        this.props,
        this.state.encoding,
        this.state.useSpaces,
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
          encoding={this.state.encoding}
          onEncodingChange={
            this.props.showEncoding && this.handleEncodingChange
          }
          length={codec.splitByCodePoints(this.state.value).length}
          error={this.state.error}/>
        <textarea
          className={textareaClassName}
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
        <FormattingOptions
          spacesChecked={this.state.useSpaces}
          onSpacesChange={this.props.showSpaces && this.handleSpacesChange}
          uppercaseChecked={this.state.useUppercase}
          onCaseChange={this.props.showUppercase && this.handleCaseChange}/>
      </div>
    )
  }
}

export default EncodingViewCore;
