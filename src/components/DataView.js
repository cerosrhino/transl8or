import React, { Component } from 'react';
import Codec from '../Codec';
import './DataView.css';

class DataView extends Component {
  constructor(props) {
    super(props);

    this.codec = new Codec();

    this.state = {
      value: '',
      error: false
    };
  }

  filter(input) {
    return input;
  }

  format(input) {
    return input;
  }

  parse(input) {
    return input;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.format(nextProps.text)
    });
  }

  handleChange = (event) => {
    try {
      this.setState({
        value: this.filter(event.target.value),
        error: false
      });
      this.props.onChange(this.parse(event.target.value));
    } catch (e) {
      this.setState({
        error: true
      });
    }
  }
  
  handleEncodingChange = (encoding) => {
    this.codec.setEncoding(encoding);
    this.setState({
      value: this.format(this.props.text)
    });
  }

  textareaClass = () => {
    let textareaClass = 'data-view__textarea';
    if (this.state.error) {
      textareaClass += ' data-view__textarea--error';
    }

    return textareaClass;
  }

  render() {
    return (
      <div className="data-view">
        <textarea
          className="data-view__textarea"
          spellCheck="false"
          onChange={this.handleChange}
          value={this.state.value}/>
      </div>
    );
  }
}

export default DataView;
