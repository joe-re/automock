import React from 'react';

export default class FileList extends React.Component {
  render() {
    const options = this.props.mockFiles.map((file) =>
      <option value={file} key={file}>{file}</option>
    );
    return(
      <div className="mock-file-list col-xs-5">
        <label htmlFor="mock-file-list">mock files</label>
        <div>
          <select id="mock-file-list" multiple size="10">
            {options}
          </select>
        </div>
      </div>
    );
  }
};
