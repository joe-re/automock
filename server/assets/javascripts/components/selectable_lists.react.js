import React from 'react';
import FileList from './file_list';
import SelectButtons from './select_buttons';

export default class SelectableLists extends React.Component {
  render() {
    return(
      <div className="selectable-lists row">
        <FileList title={"not selected files"} files={this.props.mockFiles} />
        <SelectButtons />
        <FileList title={"selected files"} files={this.props.mockFiles} />
      </div>
    );
  }
};
