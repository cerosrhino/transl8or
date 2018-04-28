import DataView from './DataView';

class ChunkedDataView extends DataView {
  constructor(props) {
    super(props);

    this.state.separator = '';
    this.chunkLength = 0;
  }

  handleSpacesChange = (checked) => {
    this.setState((prevState, props) => ({
      separator: checked ? ' ' : '',
      value: checked ?
        prevState.value.replace(
          new RegExp(`(.{1,${this.chunkLength}})`, 'g'), '$1 ').trim() :
        prevState.value.replace(/\s/g, '')
    }));
  }
}

export default ChunkedDataView;