import React from 'react';

export default class FileList extends React.Component {
  constructor() {
    super();
    this.state = { searchingValue: '' };

  }
  handleSelect(file) {
    this.props.onChange(file);
  }
  handleChangeIncrementalSearchInput(e) {
    this.setState({ searchingValue: e.target.value });
  }
  render() {
    const options = this.props.files.map((file) => {
      const { searchingValue } = this.state;
      if (searchingValue && file.name.indexOf(searchingValue) < 0) {
        return;
      }
      let className = 'item';
      if (file === this.props.viewingFile) {
        className += ' active';
      }
      return (
        <div
          className={className}
          onClick={this.handleSelect.bind(this, file)}
          key={file.name}
        >
          {file.name}
        </div>
      );
    });
    return(
      <div className="file-list col-xs-5">
        <h5>{this.props.title}</h5>
        <input className="incremental-search-input" onChange={this.handleChangeIncrementalSearchInput.bind(this)}/>
        <div className="file-select-box">
          {options}
        </div>
      </div>
    );
  }
};
