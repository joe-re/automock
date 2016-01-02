import React from 'react';

export default class FileList extends React.Component {
  handleSelect(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const options = this.props.files.map((file) =>
      <option value={file.name} key={file.name}>{file.name}</option>
    );
    return(
      <div className="file-list col-xs-5">
        <div className="title">{this.props.title}</div>
        <div>
          <select size="10" onChange={this.handleSelect.bind(this)}>
            {options}
          </select>
        </div>
      </div>
    );
  }
};
