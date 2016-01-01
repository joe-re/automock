import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PageActions from '../actions/page_actions';

class AppContainer extends React.Component {
  render() {
    const { getInitialPage } = this.props;
    return (
      <div>
        <button onClick={getInitialPage}>this</button>
        {this.props.page}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
