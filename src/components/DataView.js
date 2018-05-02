import React, { Component } from 'react';
import Codec from '../Codec';

class DataView extends Component {
  constructor(props) {
    super(props);

    this.codec = new Codec();

    this.state = {
      value: ''
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
        value: this.filter(event.target.value)
      });
      this.props.onChange(this.parse(event.target.value));
    } catch (e) {
      console.log(e);
    }
  }
  
  handleEncodingChange = (encoding) => {
    this.codec.setEncoding(encoding);
    this.setState({
      value: this.format(this.props.text)
    });
  }

  render() {
    return (
      <textarea
        spellCheck="false"
        onChange={this.handleChange}
        value={this.state.value}/>
    );
  }
}

export default DataView;