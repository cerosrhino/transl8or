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
      error: false
    };
  }

  static deserialize(serializedOptions) {
    return {
      encoding: ((serializedOptions >> 5) & 0b111),
      useSpaces: !!((serializedOptions >> 4) & 1),
      useUppercase: !!((serializedOptions >> 3) & 1)
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      serializedOptions: nextProps.serializedOptions,
      value: EncodingViewCore.updateValue(nextProps)
    };
  }

  static updateValue = (props) => {
    const { encoding, useSpaces, useUppercase } = EncodingViewCore.deserialize(
      props.serializedOptions
    );

    let value = props.format(props.text, encoding).join(useSpaces ? ' ' : '');
    if (useUppercase) {
      value = value.toUpperCase();
    }
    
    return value;
  }

  handleChange = (event) => {
    const { encoding } = EncodingViewCore.deserialize(
      this.props.serializedOptions
    );

    this.setState({
      value: this.props.filter(event.target.value),
      error: false
    }, () => {
      try {
        this.props.onChange(this.props.parse(this.state.value, encoding));
      } catch (e) {
        this.setState({
          error: true
        });
      }
    });
  }
  
  handleEncodingChange = (encoding) => {
    let serializedOptions = this.props.serializedOptions & 0b00011111;
    serializedOptions |= (encoding << 5);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      value: EncodingViewCore.updateValue(this.props)
    });
  }
  
  handleSpacesChange = (useSpaces) => {
    let serializedOptions = this.props.serializedOptions & 0b11101111;
    serializedOptions |= (useSpaces << 4);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      value: EncodingViewCore.updateValue(this.props)
    });
  }

  handleCaseChange = (useUppercase) => {
    let serializedOptions = this.props.serializedOptions & 0b11110111;
    serializedOptions |= (useUppercase << 3);
    this.props.onSerialize(serializedOptions);

    this.setState({
      serializedOptions,
      value: EncodingViewCore.updateValue(this.props)
    });
  }

  render() {
    const { encoding, useSpaces, useUppercase } = EncodingViewCore.deserialize(
      this.props.serializedOptions
    );

    let textareaClassName = 'data-view__textarea';
    if (this.state.error) {
      textareaClassName += ' data-view__textarea--error';
    }

    return (
      <div className="data-view">
        <Title
          text={this.props.title}
          encoding={encoding}
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
          spacesChecked={useSpaces}
          onSpacesChange={this.props.showSpaces && this.handleSpacesChange}
          uppercaseChecked={useUppercase}
          onCaseChange={this.props.showUppercase && this.handleCaseChange}/>
      </div>
    )
  }
}

export default EncodingViewCore;
