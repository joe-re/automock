import React from 'react';

export default class SelectButtons extends React.Component {
  render() {
    return(
      <div className="select-buttons col-xs-1">
        <button className="btn btn-primary">→</button>
        <button className="btn">←</button>
      </div>
    );
  }
};
