import React from 'react';

export default class FileList extends React.Component {
  render() {
    const options = this.props.files.map((file) =>
      <option value={file.name} key={file.name}>{file.name}</option>
    );
    return(
      <div className="file-list col-xs-5">
        <div className="title">{this.props.title}</div>
        <div>
          <select size="10">
            {options}
          </select>
        </div>
      </div>
    );
  }
};
