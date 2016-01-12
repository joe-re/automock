import React from 'react';
import JSONTree from 'react-json-tree';
import assign from 'object-assign';

export default class JsonViewer extends React.Component {
  parseJson() {
    const srcJson = this.props.dataSource;
    const distJson = assign({}, srcJson);
    if (!distJson.name) {
      return distJson;
    }
    distJson.response_body = JSON.parse(srcJson.response_body);
    delete distJson.id; // don't show id
    return distJson;
  }

  render(){
    const json = this.parseJson();

    let jsonTree;
    if (json.name) {
      jsonTree = <div className="json-viewer"><JSONTree data={ json } keyName={json.name} /></div>;
    }

    return (
      <div className="col-xs-12">{ jsonTree }</div>
    );
  }
}
