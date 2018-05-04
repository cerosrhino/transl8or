import DataView from './DataView';

class ChunkedDataView extends DataView {
  constructor(props) {
    super(props);

    this.separator = '';
  }

  handleSpacesChange = (checked) => {
    this.separator = checked ? ' ' : '';
    this.setState({
      value: this.format(this.props.text)
    });
  }
}

export default ChunkedDataView;
