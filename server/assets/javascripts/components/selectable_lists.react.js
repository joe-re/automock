import React from 'react';
import FileList from './file_list';
import SelectButtons from './select_buttons';

export default class SelectableLists extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFromNotSelectedFiles: '',
      selectedFromSelectedFiles: ''
    };
  }

  handleSelectFromNotSelectedFiles(selectedFile) {
    this.setState({ selectedFromNotSelectedFiles: selectedFile });
  }

  handleSelectFromSelectedFiles(selectedFile) {
    this.setState({ selectedFromSelectedFiles: selectedFile });
  }

  render() {
    const { selectedFiles, unselectedFiles } = this.props;
    return(
      <div className="selectable-lists row">
        <FileList
          title={"not selected files"}
          files={unselectedFiles}
          onChange={this.handleSelectFromNotSelectedFiles.bind(this)}
        />
        <SelectButtons onClickSelectButton={this.props.onCreateSelectedFile} {...this.state} />
        <FileList
          title={"selected files"}
          files={selectedFiles}
          onChange={this.handleSelectFromSelectedFiles.bind(this)}
        />
      </div>
    );
  }
};
