import { Component } from 'react';
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
    this.setState({
      value: this.filter(event.target.value),
      error: false
    }, () => {
      try {
        this.props.onChange(this.parse(this.state.value));
      } catch (e) {
        this.setState({
          error: true
        });
      }
    });
  }
  
  handleEncodingChange = (encoding) => {
    this.codec.setEncoding(encoding);
    this.setState({
      value: this.format(this.props.text)
    });
  }

  textareaClassName() {
    let className = 'data-view__textarea';
    if (this.state.error) {
      className += ' data-view__textarea--error';
    }

    return className;
  }
}

export default DataView;
