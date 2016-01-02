import React from 'react';

export default class SelectButtons extends React.Component {
  handleClickSelectButton() {
    this.props.onClickSelectButton(this.props.selectedFromNotSelectedFiles);
  }
  render() {
    return(
      <div className="select-buttons col-xs-1">
        <button className="btn btn-primary" onClick={this.handleClickSelectButton.bind(this)}>→</button>
        <button className="btn">←</button>
      </div>
    );
  }
};
