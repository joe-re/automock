import React from 'react';

export default class FileList extends React.Component {
  handleSelect(file) {
    this.props.onChange(file);
  }
  render() {
    const options = this.props.files.map((file) => {
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
        <input className="incremental-search-input"/>
        <div className="file-select-box">
          {options}
        </div>
      </div>
    );
  }
};
