import React from 'react';
import FileList from './file_list';

export default class SelectableLists extends React.Component {
  render() {
    return(
      <div className="selectable-lists">
        <FileList title={"not selected files"} files={this.props.mockFiles} />
        <FileList title={"selected files"} files={this.props.mockFiles} />
      </div>
    );
  }
};
