import React from 'react';

export default class SelectButtons extends React.Component {
  handleClickSelectButton() {
    this.props.onClickSelectButton(this.props.selectedFromNotSelectedFiles);
  }
  handleClickUnselectButton() {
    this.props.onClickUnselectButton(this.props.selectedFromSelectedFiles.id);
  }
  render() {
    return(
      <div className="select-buttons col-xs-2">
        <button className="btn btn-primary" onClick={this.handleClickSelectButton.bind(this)}>→</button>
        <button className="btn" onClick={this.handleClickUnselectButton.bind(this)}>←</button>
      </div>
    );
  }
};
