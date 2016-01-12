import React from 'react';
import FileList from './file_list';
import SelectButtons from './select_buttons';
import JsonViewer from './json_viewer';

export default class SelectableLists extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFromNotSelectedFiles: {},
      selectedFromSelectedFiles: {},
      viewingFile: {}
    };
  }

  handleSelectFromNotSelectedFiles(selectedFile) {
    this.setState({
      viewingFile: selectedFile,
      selectedFromNotSelectedFiles: selectedFile
    });
  }

  handleSelectFromSelectedFiles(selectedFile) {
    this.setState({
      viewingFile: selectedFile,
      selectedFromSelectedFiles: selectedFile
    });
  }

  render() {
    const { selectedFiles, unselectedFiles } = this.props;
    return(
      <div className="selectable-lists">
        <div className="row">
          <FileList
            title={"not selected files"}
            files={unselectedFiles}
            onChange={this.handleSelectFromNotSelectedFiles.bind(this)}
            viewingFile={this.state.viewingFile}
          />
          <SelectButtons
            onClickSelectButton={this.props.onCreateSelectedFile}
            onClickUnselectButton={this.props.onDeleteSelectedFile}
            {...this.state}
          />
          <FileList
            title={"selected files"}
            files={selectedFiles}
            onChange={this.handleSelectFromSelectedFiles.bind(this)}
            viewingFile={this.state.viewingFile}
          />
        </div>
        <div className="row">
          <JsonViewer dataSource={this.state.viewingFile}/>
        </div>
      </div>
    );
  }
};
