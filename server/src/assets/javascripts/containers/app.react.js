import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SelectedFilesActions from '../actions/selected_files_actions';
import * as MockFilesActions from '../actions/mock_files_actions';
import SelectableLists from './../components/selectable_lists';
import assign from 'object-assign';
import _ from 'underscore';

class AppContainer extends React.Component {
  componentDidMount() {
    const { getSelectedFiles, getMockFiles } = this.props;
    getSelectedFiles();
    getMockFiles();
  }

  handleCreateSelectedFile(file) {
    const { createSelectedFile } = this.props;
    createSelectedFile(file);
  }

  handleDeleteSelectedFile(id) {
    const { deleteSelectedFile } = this.props;
    deleteSelectedFile(id);
  }

  computeFileContents() {
    const { selectedFiles, mockFiles } = this.props;
    const selectedFileNames = selectedFiles.map((file) => file.name).toArray();
    const splited = _.partition(mockFiles.toArray(), (file) => _.includes(selectedFileNames, file.name));
    splited[0] = splited[0].map((file) => {
      file.id = _.find(selectedFiles.toArray(), (selectedFile) => selectedFile.name === file.name).id;
      return file;
    });
    return({ selectedFiles: splited[0], unselectedFiles: splited[1] });
  }

  render() {
    const { selectedFiles, unselectedFiles } = this.computeFileContents();
    return (
      <div className="container">
        <SelectableLists
          selectedFiles={selectedFiles}
          unselectedFiles={unselectedFiles}
          onCreateSelectedFile={this.handleCreateSelectedFile.bind(this)}
          onDeleteSelectedFile={this.handleDeleteSelectedFile.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedFiles: state.selectedFiles,
    mockFiles: state.mockFiles
  };
}

function mapDispatchToProps(dispatch) {
  const actions = assign({}, SelectedFilesActions, MockFilesActions);
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
