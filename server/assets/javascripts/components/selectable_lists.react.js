import React from 'react';
import FileList from './file_list';
import SelectButtons from './select_buttons';

export default class SelectableLists extends React.Component {
  render() {
    const { selectedFiles, mockFiles } = this.props;
    return(
      <div className="selectable-lists row">
        <FileList title={"not selected files"} files={mockFiles} />
        <SelectButtons />
        <FileList title={"selected files"} files={selectedFiles} />
      </div>
    );
  }
};
