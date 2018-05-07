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

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   // this.setState({
  //   //   value: nextProps.format(nextProps.text || '')
  //   // });
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('update');
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    return (nextProps.format && typeof nextProps.text !== 'undefined') ?
             DataView.updateValue(nextProps, prevState) :
             null;
  }

  static updateValue = (props, state) => {
    let value = props.format(props.text, state.encoding).join(state.separator);
    if (state.useUppercase) {
      value = value.toUpperCase();
    }
    return { value };
  }

  handleChange = (event) => {
    // console.log(this.props);
    this.setState({
      value: this.props.filter(event.target.value),
      error: false
    }, () => {
      try {
        // console.log('f', this.props.parse(this.state.value));
        this.props.onChange(
          this.props.parse(this.state.value, this.state.encoding)
        );
      } catch (e) {
        // console.log(e);
        this.setState({
          error: true
        });
      }
    });
  }
  
  handleEncodingChange = (encoding) => {
    console.log(encoding);
    // this.setState(DataView.updateValue(this.props, this.state));
    this.setState({
      encoding,
      value: this.props.format(this.state.value, 2)
    });
  }
  
  handleSpacesChange = (checked) => {
    // this.state.separator = checked ? ' ' : '';
    this.setState(DataView.updateValue(this.props, this.state));
  }

  handleCaseChange = (checked) => {
    this.state.useUppercase = checked;
    // this.setState({
    //   value: this.props.format(this.props.text, this.state.codec)
    // });
    this.setState(DataView.updateValue(this.props, this.state));
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
        {this.props.children}
      </div>
    )
  }
}

export default DataView;
