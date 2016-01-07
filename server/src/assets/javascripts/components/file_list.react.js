import React from 'react';

export default class FileList extends React.Component {
  handleSelect(e) {
    const selectedFile = this.props.files.filter((file) => file.name === e.target.value).toArray()[0];
    this.props.onChange(selectedFile);
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
