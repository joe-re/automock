/* flow */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PageActions from '../actions/mock_files_actions';
import FileList from './../components/file_list';

class AppContainer extends React.Component {
  componentDidMount() {
    const { getMockFiles } = this.props;
    getMockFiles();
  }

  render() {
    const { mockFiles } = this.props;
    return (
      <div className="container">
        <FileList mockFiles={mockFiles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mockFiles: state.mockFiles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
