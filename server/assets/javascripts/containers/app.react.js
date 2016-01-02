/* flow */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SelectedFilesActions from '../actions/selected_files_actions';
import * as MockFilesActions from '../actions/mock_files_actions';
import SelectableLists from './../components/selectable_lists';
import assign from 'object-assign';

class AppContainer extends React.Component {
  componentDidMount() {
    const { getSelectedFiles, getMockFiles } = this.props;
    getSelectedFiles();
    getMockFiles();
  }

  handleCreateSelectedFile(name) {
    const { createSelectedFile } = this.props;
    createSelectedFile(name);
  }

  render() {
    const { selectedFiles, mockFiles } = this.props;
    return (
      <div className="container">
        <SelectableLists
          selectedFiles={selectedFiles}
          mockFiles={mockFiles}
          onCreateSelectedFile={this.handleCreateSelectedFile.bind(this)}
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
