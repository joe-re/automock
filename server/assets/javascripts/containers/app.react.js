/* flow */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PageActions from '../actions/mock_files_actions';
import SelectableLists from './../components/selectable_lists';

class AppContainer extends React.Component {
  componentDidMount() {
    const { getMockFiles } = this.props;
    getMockFiles();
  }

  render() {
    const { mockFiles } = this.props;
    return (
      <div className="container">
        <SelectableLists mockFiles={mockFiles} />
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
